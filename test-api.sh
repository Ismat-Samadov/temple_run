#!/bin/bash

# API Testing Script for Randevu Application
# Tests core API endpoints and functionality

BASE_URL="http://localhost:3000"
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "🧪 RANDEVU API TESTING"
echo "====================="
echo "Base URL: $BASE_URL"
echo ""

# Test counter
TOTAL_TESTS=0
PASSED_TESTS=0
FAILED_TESTS=0

# Function to run a test
run_test() {
    local test_name="$1"
    local endpoint="$2"
    local expected_status="$3"
    local method="${4:-GET}"

    TOTAL_TESTS=$((TOTAL_TESTS + 1))

    echo -n "Testing: $test_name ... "

    if [ "$method" = "GET" ]; then
        response=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL$endpoint")
    fi

    if [ "$response" = "$expected_status" ]; then
        echo -e "${GREEN}✓ PASS${NC} (HTTP $response)"
        PASSED_TESTS=$((PASSED_TESTS + 1))
    else
        echo -e "${RED}✗ FAIL${NC} (Expected $expected_status, got $response)"
        FAILED_TESTS=$((FAILED_TESTS + 1))
    fi
}

# Function to test JSON response
test_json_endpoint() {
    local test_name="$1"
    local endpoint="$2"

    TOTAL_TESTS=$((TOTAL_TESTS + 1))

    echo -n "Testing: $test_name ... "

    response=$(curl -s "$BASE_URL$endpoint")

    # Check if response is valid JSON
    if echo "$response" | jq empty 2>/dev/null; then
        echo -e "${GREEN}✓ PASS${NC} (Valid JSON response)"
        PASSED_TESTS=$((PASSED_TESTS + 1))
        return 0
    else
        echo -e "${RED}✗ FAIL${NC} (Invalid JSON or error)"
        FAILED_TESTS=$((FAILED_TESTS + 1))
        return 1
    fi
}

echo "📋 PUBLIC PAGES"
echo "----------------"
run_test "Home page" "/" "200"
run_test "About page" "/about" "200"
run_test "Help page" "/help" "200"
run_test "Terms page" "/terms" "200"
run_test "Privacy page" "/privacy" "200"

echo ""
echo "🔐 AUTHENTICATION PAGES"
echo "-----------------------"
run_test "Sign in page" "/auth/signin" "200"
run_test "Sign up page" "/auth/signup" "200"

echo ""
echo "👥 PROTECTED ROUTES (Should redirect or 401)"
echo "---------------------------------------------"
run_test "Patient dashboard (no auth)" "/dashboard" "307"
run_test "Doctor dashboard (no auth)" "/doctor/dashboard" "307"
run_test "Admin dashboard (no auth)" "/admin/dashboard" "307"

echo ""
echo "🏥 DOCTORS API"
echo "--------------"
test_json_endpoint "Get verified doctors list" "/api/doctors"

echo ""
echo "📅 APPOINTMENTS API"
echo "-------------------"
run_test "Appointments endpoint (no auth)" "/api/appointments" "401"

echo ""
echo "⚙️  HEALTH CHECK"
echo "----------------"
run_test "Server health" "/" "200"

echo ""
echo "📊 TEST SUMMARY"
echo "==============="
echo -e "Total Tests:  $TOTAL_TESTS"
echo -e "${GREEN}Passed:       $PASSED_TESTS${NC}"
echo -e "${RED}Failed:       $FAILED_TESTS${NC}"
echo ""

if [ $FAILED_TESTS -eq 0 ]; then
    echo -e "${GREEN}✓ All tests passed!${NC}"
    exit 0
else
    echo -e "${YELLOW}⚠ Some tests failed${NC}"
    exit 1
fi
