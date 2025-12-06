# --- 0. SELF-HEALING PROTOCOL ---
import sys
import subprocess

def install(package):
    print(f">> INSTALLING {package.upper()}...")
    subprocess.check_call([sys.executable, "-m", "pip", "install", package])

try:
    import matplotlib.pyplot as plt
    import numpy as np
except ImportError:
    print(">> DETECTED FRESH KERNEL. RE-INITIALIZING MODULES...")
    install("matplotlib")
    install("numpy")
    print(">> MODULES INSTALLED. RESTARTING SEQUENCE...")
    import matplotlib.pyplot as plt
    import numpy as np

import random

# --- THE THRONE: SOVEREIGN DASHBOARD ---

print(">> INITIALIZING MISSION CONTROL...")
print(">> LINKING SUBSYSTEMS...")

# Setup the UI Grid
plt.style.use('dark_background')
fig, axs = plt.subplots(2, 2, figsize=(16, 10))
fig.suptitle('SOVEREIGN NODE: COMMAND OVERWATCH', fontsize=20, color='#00f3ff', fontweight='bold')

# --- PANEL 1: THE ORACLE (Financial Projection) ---
ax1 = axs[0, 0]
days = 100
path = np.zeros(days)
path[0] = 70721 # Starting Capital
for t in range(1, days):
    path[t] = path[t-1] * np.exp(0.001 + np.random.normal(0, 0.02))

ax1.plot(path, color='#ffb300', linewidth=2)
ax1.set_title("ASSET TRAJECTORY [ORACLE]", color='#ffb300')
ax1.grid(True, alpha=0.2)
ax1.fill_between(range(days), path, color='#ffb300', alpha=0.1)
ax1.text(5, path[0], "CURRENT", color='white')
ax1.text(days-15, path[-1], "TARGET", color='#ffb300', fontweight='bold')

# --- PANEL 2: DEFENSE MATRIX (Bar Chart) ---
ax2 = axs[0, 1]
systems = ['KYBER-1024', 'FIREWALL', 'GHOST_ECHO', 'PHYSICAL', 'ENTROPY']
levels = [100, 98, 100, 85, 92]
colors = ['#00f3ff', '#00f3ff', '#00ff9d', '#ff003c', '#bd00ff']

ax2.barh(systems, levels, color=colors)
ax2.set_title("DEFENSE INTEGRITY", color='#00f3ff')
ax2.set_xlim(0, 110)
ax2.axvline(x=100, color='white', linestyle='--', alpha=0.5)
ax2.text(102, 0, "MAX", color='gray', fontsize=8)

# --- PANEL 3: GLOBAL NODE MAP (Scatter) ---
ax3 = axs[1, 0]
nodes_x = np.random.rand(50) * 100
nodes_y = np.random.rand(50) * 100
colors_map = np.where(np.random.rand(50) > 0.8, '#ff003c', '#00f3ff') 
sizes = np.random.rand(50) * 100

ax3.scatter(nodes_x, nodes_y, s=sizes, c=colors_map, alpha=0.8)
ax3.scatter([50], [50], s=300, c='#fff', marker='*') # YOU
ax3.set_title("NETWORK TOPOLOGY [WARSAW NODE]", color='#fff')
ax3.set_facecolor('#050510')
ax3.grid(False)
ax3.text(52, 52, "ROOT", color='white', fontweight='bold')

# --- PANEL 4: ENTROPY MONITOR (Real-time Noise) ---
ax4 = axs[1, 1]
x = np.linspace(0, 10, 100)
y1 = np.sin(x) * np.random.normal(1, 0.2, 100)
y2 = np.cos(x) * np.random.normal(1, 0.5, 100)

ax4.plot(x, y1, color='#bd00ff', label='Data Noise')
ax4.plot(x, y2, color='#333', linewidth=0.5, label='Baseline')
ax4.set_title("ENTROPY FLOOD RATE", color='#bd00ff')
ax4.set_facecolor('#000')
ax4.legend(loc='upper right')

# --- FINAL RENDER ---
plt.tight_layout(rect=[0, 0.03, 1, 0.95])
print(">> DASHBOARD COMPILED.")
print(">> SYSTEM IS SOVEREIGN.")
plt.show()