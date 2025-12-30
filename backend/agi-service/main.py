"""
AGI Service - Adaptive Game Intelligence

FastAPI-based service providing AI-powered adaptive game experiences
through pluggable LLM integration.
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import uvicorn

app = FastAPI(
    title="Quantum ML Game - AGI Service",
    description="Adaptive Game Intelligence Service with pluggable LLM",
    version="0.1.0"
)

# Enable CORS for mobile apps
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure appropriately for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Request/Response Models
class GameContext(BaseModel):
    """Current game state and context"""
    player_level: int
    current_challenge: str
    performance_metrics: Dict[str, float]
    recent_actions: List[str]


class AdaptationRequest(BaseModel):
    """Request for game adaptation"""
    context: GameContext
    adaptation_type: str  # "difficulty", "hint", "challenge", "feedback"


class AdaptationResponse(BaseModel):
    """Adapted game content"""
    content: str
    difficulty_adjustment: Optional[float] = None
    next_challenge: Optional[str] = None
    metadata: Dict[str, Any] = {}


class LLMProvider:
    """
    Abstract LLM provider interface
    Allows plugging different LLM backends (OpenAI, Anthropic, local models, etc.)
    """
    
    def __init__(self, provider_type: str = "mock"):
        self.provider_type = provider_type
        # TODO: Initialize actual LLM provider
        # self.client = initialize_provider(provider_type)
    
    def generate(self, prompt: str, context: Dict[str, Any]) -> str:
        """
        Generate adaptive content based on prompt and context
        
        Args:
            prompt: The generation prompt
            context: Game context information
            
        Returns:
            Generated content
        """
        # TODO: Implement actual LLM call
        # For now, return mock responses
        return self._mock_generate(prompt, context)
    
    def _mock_generate(self, prompt: str, context: Dict[str, Any]) -> str:
        """Mock generation for development"""
        if "hint" in prompt.lower():
            return "Try visualizing the qubit state on the Bloch sphere. Remember that |0⟩ is at the north pole!"
        elif "challenge" in prompt.lower():
            return "Create a superposition state with equal probabilities for |0⟩ and |1⟩"
        elif "feedback" in prompt.lower():
            return "Great job! You've successfully manipulated the qubit state."
        else:
            return "Continue exploring quantum states to unlock new challenges!"


# Initialize LLM provider
llm_provider = LLMProvider(provider_type="mock")


@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "service": "AGI Service",
        "status": "running",
        "version": "0.1.0",
        "llm_provider": llm_provider.provider_type
    }


@app.post("/api/v1/adapt", response_model=AdaptationResponse)
async def adapt_game(request: AdaptationRequest):
    """
    Generate adaptive game content based on player context
    
    Args:
        request: Adaptation request with game context
        
    Returns:
        Adapted game content and parameters
    """
    context = request.context
    adaptation_type = request.adaptation_type
    
    # Build prompt based on adaptation type and context
    if adaptation_type == "hint":
        prompt = f"""
        Provide a helpful hint for a player at level {context.player_level}
        working on: {context.current_challenge}
        Recent performance: {context.performance_metrics}
        Keep it concise and educational.
        """
    elif adaptation_type == "challenge":
        prompt = f"""
        Generate a new quantum computing challenge for level {context.player_level}.
        Previous challenge: {context.current_challenge}
        Player performance: {context.performance_metrics}
        Make it appropriately challenging.
        """
    elif adaptation_type == "feedback":
        prompt = f"""
        Provide encouraging feedback for a player who just completed:
        {context.current_challenge}
        Performance: {context.performance_metrics}
        """
    else:
        raise HTTPException(status_code=400, detail="Unknown adaptation type")
    
    # Generate content using LLM
    content = llm_provider.generate(prompt, context.dict())
    
    # Calculate difficulty adjustment based on performance
    # If there are no performance metrics, avg_performance is set to 0 by default.
    avg_performance = (
        sum(context.performance_metrics.values()) / len(context.performance_metrics)
        if context.performance_metrics else 0.5
    )
    difficulty_adjustment = 0.0
    if avg_performance > 0.8:
        difficulty_adjustment = 0.1  # Increase difficulty
    elif avg_performance < 0.5:
        difficulty_adjustment = -0.1  # Decrease difficulty
    
    return AdaptationResponse(
        content=content,
        difficulty_adjustment=difficulty_adjustment if adaptation_type == "challenge" else None,
        metadata={
            "prompt_type": adaptation_type,
            "player_level": context.player_level,
            "timestamp": "2024-01-01T00:00:00Z"  # TODO: Use actual timestamp
        }
    )


@app.post("/api/v1/configure-llm")
async def configure_llm(provider_type: str, api_key: Optional[str] = None):
    """
    Configure the LLM provider
    
    Args:
        provider_type: Type of LLM provider ("openai", "anthropic", "local", etc.)
        api_key: API key if required
        
    Returns:
        Configuration status
    """
    global llm_provider
    
    # TODO: Implement actual provider configuration
    # For now, just update the mock provider
    llm_provider = LLMProvider(provider_type=provider_type)
    
    return {
        "status": "configured",
        "provider": provider_type,
        "message": "LLM provider configured successfully"
    }


@app.get("/api/v1/health")
async def health_check():
    """Service health check"""
    return {
        "status": "healthy",
        "llm_provider": llm_provider.provider_type,
        "version": "0.1.0"
    }


if __name__ == "__main__":
    print("Starting AGI Service...")
    print("API Documentation: http://localhost:8000/docs")
    uvicorn.run(app, host="0.0.0.0", port=8000)
