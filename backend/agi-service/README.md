# AGI Service

Adaptive Game Intelligence service providing AI-powered game experiences through pluggable LLM integration.

## Features

- **Adaptive Difficulty**: Dynamically adjusts challenge difficulty based on player performance
- **Intelligent Hints**: Provides context-aware hints using LLM
- **Challenge Generation**: Creates personalized challenges
- **Performance Feedback**: Generates encouraging and educational feedback
- **Pluggable LLM**: Support for multiple LLM providers (OpenAI, Anthropic, local models)

## Quick Start

```bash
# Install dependencies
pip install -r requirements.txt

# Run the service
python main.py
```

The service will start on `http://localhost:8000`

## API Documentation

Once running, visit:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Endpoints

### POST /api/v1/adapt
Generate adaptive game content

```json
{
  "context": {
    "player_level": 5,
    "current_challenge": "Create Bell state",
    "performance_metrics": {"accuracy": 0.85, "speed": 0.75},
    "recent_actions": ["applied_hadamard", "applied_cnot"]
  },
  "adaptation_type": "hint"
}
```

### POST /api/v1/configure-llm
Configure LLM provider

```json
{
  "provider_type": "openai",
  "api_key": "sk-..."
}
```

## LLM Provider Configuration

### OpenAI
```python
provider_type = "openai"
api_key = "your-openai-api-key"
```

### Anthropic
```python
provider_type = "anthropic"
api_key = "your-anthropic-api-key"
```

### Local Model
```python
provider_type = "local"
# No API key needed
```

## Development

The service currently uses a mock LLM provider for development. To integrate a real LLM:

1. Install the appropriate SDK (uncomment in requirements.txt)
2. Implement the provider in `LLMProvider` class
3. Configure with your API key

## Next Steps

- [ ] Implement OpenAI provider
- [ ] Implement Anthropic provider
- [ ] Add local model support (e.g., Llama)
- [ ] Implement prompt caching
- [ ] Add rate limiting
- [ ] Add authentication
- [ ] Implement feedback storage
