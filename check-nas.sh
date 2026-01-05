#!/bin/bash
# Check what's on the NAS

echo "Checking NAS deployment folder..."
ssh daniele@NAS_Irisgatan "ls -la /volume1/docker/begga.daniele.is/"
echo ""
echo "Checking if there's a birthday-of-love folder..."
ssh daniele@NAS_Irisgatan "ls -la /volume1/docker/ | grep -E 'begga|birthday'"
