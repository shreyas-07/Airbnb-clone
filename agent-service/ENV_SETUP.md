# Agent Service Environment Variables

Create a `.env` file in the `agent-service/` directory with the following variables:

```bash
# OpenAI Configuration
OPENAI_API_KEY=your-openai-api-key-here
OPENAI_MODEL_NAME=gpt-4o-mini

# Anthropic Configuration
ANTHROPIC_API_KEY=your-anthropic-api-key-here
ANTHROPIC_MODEL_NAME=claude-3-sonnet-20240229

# Supabase Configuration
DATABASE_URL=postgresql://user:password@host:5432/database
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# Tavily API (for web search)
TAVILY_API_KEY=your-tavily-api-key-here
TAVILY_ENABLED=false

# Weather API
WEATHER_API_KEY=your-weather-api-key-here

# LangSmith (optional, for observability)
LANGSMITH_API_KEY=your-langsmith-api-key-here
LANGSMITH_PROJECT=your-project-name
LANGSMITH_API_URL=https://api.smith.langchain.com

# Service Configuration
AGENT_SERVICE_PORT=8000
ENVIRONMENT=development

# CORS Origins (comma-separated)
CORS_ORIGINS=http://localhost:5173,http://localhost:3000

# Feature Flags
SHOW_TRIP_INSIGHTS=true
```

**Note**: The `.env` file is gitignored and should not be committed to version control.

