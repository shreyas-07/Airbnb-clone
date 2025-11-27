# Agent Service - AI Concierge & Travel Planning

A FastAPI-based microservice that provides AI-powered travel concierge functionality using LangChain, LangGraph, and multiple LLM providers (OpenAI, Anthropic).

## 🎯 Current Implementation Status

### ✅ **Implemented (Ready to Use)**

#### **Concierge Planning Workflow**
- **Endpoint**: `POST /api/agent/concierge`
- **Functionality**: 
  - Understands user travel intent (dates, budget, constraints)
  - Gathers context from Supabase (properties, POIs, events)
  - Uses LLM (OpenAI GPT-4o-mini or Anthropic Claude) to generate personalized itineraries
  - Provides explanations and recommendations
  - Returns structured responses with insights

#### **Chat Agent**
- **Functionality**:
  - Conversational interface for travel questions
  - Integrates with Supabase for booking/property context
  - Uses Tavily for web search when needed
  - Weather forecasting integration
  - Provides citations and structured insights

#### **Context Service**
- Gathers property data from Supabase
- Fetches Points of Interest (POIs)
- Retrieves local events
- Web search via Tavily API
- Weather data integration

#### **External Integrations**
- ✅ Supabase (database queries)
- ✅ OpenAI (GPT-4o-mini)
- ✅ Anthropic (Claude Sonnet)
- ✅ Tavily (web search)
- ✅ Weather API (forecasts)

### 🚧 **Planned (Not Yet Implemented)**

Based on the full system architecture, the following components are planned but not yet built:

#### **Deals Agent (Backend Worker)**
- Kafka-based deal ingestion from CSV feeds
- Normalization of supplier data
- Deal detection (price drops, limited inventory)
- Deal scoring algorithm
- Publishing to Kafka topics (`deals.normalized`, `deals.scored`, `deals.tagged`)

#### **Offer Tagger**
- Metadata enrichment (refundable, pet-friendly, near transit)
- Tag-based filtering
- Publishing tagged offers to Kafka

#### **Bundle Builder**
- Flight + Hotel bundle composition from cached deals
- Fit Score calculation (price vs budget, amenity matches)
- Bundle optimization

#### **WebSocket Events**
- `/events` endpoint for real-time updates
- Price drop notifications
- Inventory alerts
- Deal updates

#### **Watch System**
- Price threshold monitoring
- Inventory tracking
- Asynchronous notifications

## 📋 API Endpoints

### **Concierge Planning**
```http
POST /api/agent/concierge
Content-Type: application/json

{
  "destination": "Tokyo",
  "check_in": "2024-10-25",
  "check_out": "2024-10-27",
  "budget": 1000,
  "travelers": 2,
  "preferences": {
    "pet_friendly": true,
    "near_transit": true
  }
}
```

**Response:**
```json
{
  "itinerary": {
    "summary": "...",
    "recommendations": [...],
    "insights": {...}
  }
}
```

### **Health Check**
```http
GET /api/agent/health
```

### **Debug Context** (Development)
```http
POST /api/agent/debug/context
```

## 🔧 Configuration

See `ENV_SETUP.md` for required environment variables.

**Required:**
- `DATABASE_URL` - Supabase PostgreSQL connection
- `SUPABASE_URL` - Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key
- `OPENAI_API_KEY` or `ANTHROPIC_API_KEY` - At least one LLM provider

**Optional:**
- `TAVILY_API_KEY` - For web search
- `WEATHER_API_KEY` - For weather forecasts
- `LANGSMITH_API_KEY` - For observability

## 🚀 Running the Service

### **Local Development**
```bash
cd agent-service
uv sync  # Install dependencies
uvicorn app.main:app --reload --port 8000
```

### **Docker**
```bash
docker build -t agent-service .
docker run -p 8000:8000 --env-file .env agent-service
```

## 🧪 Testing Current Functionality

### **1. Test Concierge Planning**
```bash
curl -X POST http://localhost:8000/api/agent/concierge \
  -H "Content-Type: application/json" \
  -d '{
    "destination": "Tokyo",
    "check_in": "2024-10-25",
    "check_out": "2024-10-27",
    "budget": 1000,
    "travelers": 2
  }'
```

### **2. Test Health Endpoint**
```bash
curl http://localhost:8000/health
```

### **3. Test Context Building**
```bash
curl -X POST http://localhost:8000/api/agent/debug/context \
  -H "Content-Type: application/json" \
  -d '{
    "destination": "Tokyo",
    "check_in": "2024-10-25",
    "check_out": "2024-10-27"
  }'
```

## 🔗 Integration with Other Components

### **Current Integration Points**

1. **Supabase Database**: 
   - Reads property listings
   - Queries bookings
   - Fetches POIs and events
   - **Status**: ✅ Working

2. **Backend Services**:
   - Can be called from frontend via `/api/agent` proxy
   - **Status**: ✅ Ready for integration

### **Future Integration Points** (When Other Components Are Built)

1. **Kafka Topics** (Planned):
   - `deals.normalized` - Consume normalized deal data
   - `deals.scored` - Consume scored deals for bundle building
   - `deals.tagged` - Consume tagged offers
   - `deal.events` - Publish deal updates
   - **Status**: 🚧 Not yet implemented

2. **Deals Cache** (Planned):
   - In-memory or Redis cache of deals
   - Used for bundle composition
   - **Status**: 🚧 Not yet implemented

3. **WebSocket Clients** (Planned):
   - Frontend connections for real-time updates
   - Price/inventory watch notifications
   - **Status**: 🚧 Not yet implemented

## 📊 Architecture

```
┌─────────────────┐
│   Frontend      │
│   (React)       │
└────────┬────────┘
         │ HTTP
         ▼
┌─────────────────┐
│  Agent Service  │◄─── Supabase (Properties, Bookings)
│  (FastAPI)      │◄─── OpenAI/Anthropic (LLM)
│                 │◄─── Tavily (Web Search)
│  ✅ Implemented │◄─── Weather API
└─────────────────┘
         │
         │ (Future: Kafka)
         ▼
┌─────────────────┐
│  Deals Agent    │
│  (Kafka Worker) │
│  🚧 Planned     │
└─────────────────┘
```

## 🎯 Next Steps (When Other Components Are Ready)

1. **Add Kafka Consumer**:
   - Subscribe to `deals.scored` topic
   - Cache deals in memory/Redis
   - Use cached deals for bundle building

2. **Implement Bundle Builder**:
   - Compose flight + hotel bundles
   - Calculate Fit Scores
   - Generate explanations

3. **Add WebSocket Support**:
   - Implement `/events` endpoint
   - Push real-time updates
   - Handle watch subscriptions

4. **Integrate Deal Detection**:
   - Monitor price changes
   - Track inventory
   - Send notifications

## 📝 Notes

- The service is designed to work independently with Supabase
- Kafka integration is planned but not required for basic functionality
- The service gracefully degrades if optional APIs (Tavily, Weather) are unavailable
- Rate limiting is implemented (20 requests/minute by default)

## 🔒 Security

- CORS is configurable via `CORS_ORIGINS` environment variable
- Rate limiting prevents abuse
- API keys are loaded from environment variables (never hardcoded)
- Correlation IDs for request tracking

