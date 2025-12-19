"""
VQE-PHARMACY Setup Configuration
"""

from setuptools import setup, find_packages

with open("VQE_PHARMACY_README.md", "r", encoding="utf-8") as fh:
    long_description = fh.read()

with open("requirements.txt", "r", encoding="utf-8") as fh:
    requirements = [line.strip() for line in fh if line.strip() and not line.startswith("#")]

setup(
    name="vqe-pharmacy",
    version="0.1.0",
    author="VQE-PHARMACY Team",
    author_email="quantum@aixaria.com",
    description="Variational Quantum Eigensolver for Drug Discovery on IBM Quantum Heron R3",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/aixaria0/Aix",
    packages=find_packages(exclude=["tests", "tests.*", "mobile", "mobile.*"]),
    classifiers=[
        "Development Status :: 3 - Alpha",
        "Intended Audience :: Science/Research",
        "Topic :: Scientific/Engineering :: Chemistry",
        "Topic :: Scientific/Engineering :: Physics",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.8",
        "Programming Language :: Python :: 3.9",
        "Programming Language :: Python :: 3.10",
        "Programming Language :: Python :: 3.11",
        "License :: Other/Proprietary License",
        "Operating System :: OS Independent",
    ],
    python_requires=">=3.8",
    install_requires=requirements,
    extras_require={
        "dev": [
            "pytest>=7.4.0",
            "pytest-cov>=4.1.0",
            "black>=23.0.0",
            "flake8>=6.0.0",
            "mypy>=1.0.0",
        ],
    },
    entry_points={
        "console_scripts": [
            "vqe-pharmacy-benchmark=vqe_pharmacy.examples.h2_benchmark:run_all_examples",
        ],
    },
    include_package_data=True,
    zip_safe=False,
)
