"""
sambosa python package configuration.
"""

from setuptools import setup

setup(
    name='sambosa',
    version='0.1.0',
    packages=['sambosa'],
    include_package_data=True,
    install_requires=[
        'arrow',
        'bs4',
        'Flask',
        'requests',
    ],
    python_requires='>=3.8',
)
