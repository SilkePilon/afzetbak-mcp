import { FastMCP } from "fastmcp";
import { z } from "zod";
import * as services from "./services/index.js";

export function registerTools(server: FastMCP) {
  // Get all containers
  server.addTool({
    name: "get_containers",
    description: "Get a list of all available containers with real-time pricing and availability",
    parameters: z.object({}),
    execute: async () => {
      const containers = await services.ContainerService.getContainers();
      return JSON.stringify(containers);
    }
  });

  // Get containers by type
  server.addTool({
    name: "get_containers_by_type",
    description: "Get containers filtered by type from current inventory",
    parameters: z.object({
      type: z.string().describe("The type of container to filter by")
    }),
    execute: async (params) => {
      const containers = await services.ContainerService.getContainersByType(params.type);
      return JSON.stringify(containers);
    }
  });

  // Get containers by size
  server.addTool({
    name: "get_containers_by_size",
    description: "Get containers filtered by size from current inventory",
    parameters: z.object({
      size: z.string().describe("The size of container to filter by")
    }),
    execute: async (params) => {
      const containers = await services.ContainerService.getContainersBySize(params.size);
      return JSON.stringify(containers);
    }
  });

  // Get container info
  server.addTool({
    name: "get_container_info",
    description: "Get detailed information about a specific container with current pricing",
    parameters: z.object({
      containerId: z.string().describe("The ID of the container to get info for")
    }),
    execute: async (params) => {
      const container = await services.ContainerService.getContainerInfo(params.containerId);
      return JSON.stringify(container);
    }
  });

  // Get price range
  server.addTool({
    name: "get_price_range",
    description: "Get the current minimum and maximum prices for containers",
    parameters: z.object({}),
    execute: async () => {
      const range = await services.ContainerService.getPriceRange();
      return JSON.stringify(range);
    }
  });

  // Get available sizes
  server.addTool({
    name: "get_available_sizes",
    description: "Get a list of all currently available container sizes",
    parameters: z.object({}),
    execute: async () => {
      const sizes = await services.ContainerService.getSizes();
      return JSON.stringify(sizes);
    }
  });

  // Get container types
  server.addTool({
    name: "get_container_types",
    description: "Get a list of all current container types",
    parameters: z.object({}),
    execute: async () => {
      const types = await services.ContainerService.getContainerTypes();
      return JSON.stringify(types);
    }
  });

  // Get current stats
  server.addTool({
    name: "get_stats",
    description: "Get current statistics from afzetbak.nl",
    parameters: z.object({}),
    execute: async () => {
      const stats = await services.ApiClient.getStats();
      return JSON.stringify(stats);
    }
  });

  // Get current reviews
  server.addTool({
    name: "get_reviews",
    description: "Get latest customer reviews from afzetbak.nl",
    parameters: z.object({}),
    execute: async () => {
      const reviews = await services.ApiClient.getReviews();
      return JSON.stringify(reviews);
    }
  });

  // Get recent orders
  server.addTool({
    name: "get_recent_orders",
    description: "Get recent container orders from afzetbak.nl",
    parameters: z.object({}),
    execute: async () => {
      const orders = await services.ApiClient.getRecentOrderContainers();
      return JSON.stringify(orders);
    }
  });
}