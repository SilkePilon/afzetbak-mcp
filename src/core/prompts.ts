import { FastMCP } from "fastmcp";
import * as services from "./services/index.js";

interface Stats {
  total_containers?: number;
  [key: string]: any;
}

/**
 * Register all prompts with the MCP server
 * @param server The FastMCP server instance
 */
export function registerPrompts(server: FastMCP) {
  server.addPrompt({
    name: "container_info",
    description: "Provides real-time information about containers from afzetbak.nl",
    arguments: [],
    load: async () => {
      const [sizes, types, statsResponse] = await Promise.all([
        services.ContainerService.getSizes(),
        services.ContainerService.getContainerTypes(),
        services.ApiClient.getStats()
      ]);

      const stats = statsResponse as Stats;

      return `I can help you with real-time information about containers from afzetbak.nl. Our current inventory includes:

- Container sizes: ${sizes.join(', ')}
- Container types: ${types.join(', ')}
- Latest statistics: ${stats.total_containers || 0} containers delivered

I can help you with:
- Current container availability and pricing
- Finding the right container size for your needs
- Details about what materials are accepted
- Recent customer reviews and experiences
- Real-time pricing information

Note: I provide information only and cannot process orders. How can I help you find the right container?`;
    }
  });

  server.addPrompt({
    name: "latest_reviews",
    description: "Provides latest customer reviews from afzetbak.nl",
    arguments: [],
    load: async () => {
      const reviews = await services.ApiClient.getReviews();
      return `Here are some recent customer experiences with our container service: ${JSON.stringify(reviews)}`;
    }
  });
}
