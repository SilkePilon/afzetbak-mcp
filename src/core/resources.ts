import { FastMCP } from "fastmcp";
import * as services from "./services/index.js";

export function registerResources(server: FastMCP) {
  // Container size guide resource
  server.addResourceTemplate({
    uriTemplate: "container://size-guide/{size}",
    name: "Container Size Guide",
    mimeType: "text/plain",
    arguments: [
      {
        name: "size",
        description: "Container size (e.g., 6m3, 10m3)",
        required: true,
      },
    ],
    async load({ size }) {
      const sizeGuides = {
        "6m3": `6m³ container (±6.5m³):
- Dimensions: 3.85m x 1.70m x 1.00m
- Perfect for: Small renovation projects, garden waste
- Capacity: About 6-7 full trailer loads
- Placement: Fits in most driveways
- Weight limit: 2000kg`,
        
        "10m3": `10m³ container (±10m³):
- Dimensions: 4.00m x 1.70m x 1.45m
- Perfect for: Home renovations, medium construction
- Capacity: About 10-12 full trailer loads
- Placement: Standard driveway or street
- Weight limit: 3000kg`,

        "15m3": `15m³ container (±15m³):
- Dimensions: 4.00m x 1.70m x 2.20m
- Perfect for: Large renovations, construction sites
- Capacity: About 15-18 full trailer loads
- Placement: Requires good access
- Weight limit: 4000kg`
      };
      
      return {
        text: sizeGuides[size] || "Size guide not found for this container size"
      };
    }
  });

  // Material acceptance guide
  server.addResourceTemplate({
    uriTemplate: "container://material-guide/{type}",
    name: "Material Acceptance Guide",
    mimeType: "text/plain",
    arguments: [
      {
        name: "type",
        description: "Type of waste material",
        required: true,
      },
    ],
    async load({ type }) {
      const materialGuides = {
        "construction": `Construction Waste Guidelines:
- Accepted: Concrete, bricks, tiles, ceramics
- Not accepted: Asbestos, chemicals
- Sorting required: Keep wood separate
- Special notes: Clean rubble only`,

        "household": `Household Waste Guidelines:
- Accepted: Furniture, appliances, general waste
- Not accepted: Food waste, hazardous materials
- Sorting required: Separate recyclables
- Special notes: No liquid waste`,

        "green": `Green Waste Guidelines:
- Accepted: Branches, leaves, grass, plants
- Not accepted: Treated wood, contaminated soil
- Sorting required: No plastic bags
- Special notes: Clean garden waste only`
      };

      return {
        text: materialGuides[type] || "Material guide not found for this waste type"
      };
    }
  });

  // Container placement requirements
  server.addResourceTemplate({
    uriTemplate: "container://placement-guide/{location_type}",
    name: "Container Placement Guide",
    mimeType: "text/plain",
    arguments: [
      {
        name: "location_type",
        description: "Type of placement location",
        required: true,
      },
    ],
    async load({ location_type }) {
      const placementGuides = {
        "driveway": `Driveway Placement Requirements:
- Surface must be level and stable
- Min. width required: 2m
- Min. height clearance: 4m
- Access requirements: Clear path for delivery truck
- Protection: Use wooden boards for delicate surfaces`,

        "street": `Street Placement Requirements:
- Local permits may be required
- Min. space required: 6m length
- Must not block traffic
- Required markings: Safety reflectors
- Lighting: Area must be well-lit`,

        "construction": `Construction Site Requirements:
- Level, compacted surface required
- Min. overhead clearance: 4.5m
- Access width: 3m minimum
- Ground protection: Use steel plates if needed
- Site marking: Safety barriers and signs`
      };

      return {
        text: placementGuides[location_type] || "Placement guide not found for this location type"
      };
    }
  });

  // Regulatory information
  server.addResourceTemplate({
    uriTemplate: "container://regulations/{region}",
    name: "Container Regulations",
    mimeType: "text/plain",
    arguments: [
      {
        name: "region",
        description: "Region or municipality name",
        required: true,
      },
    ],
    async load({ region }) {
      const regionGuides = {
        "amsterdam": `Amsterdam Container Regulations:
- Permit required for street placement
- Max duration: 3 days without special permit
- Time restrictions: No deliveries before 7:00
- Special zones: Historic center has additional rules
- Contact: Municipality office for permits`,

        "rotterdam": `Rotterdam Container Regulations:
- Online notification required
- Max duration: 5 days standard permit
- Parking space reservation needed
- Historic areas: Special conditions apply
- Weekend restrictions may apply`,

        "default": `General Container Regulations:
- Check local municipality rules
- Permit may be required for street placement
- Consider parking restrictions
- Notify neighbors if required
- Follow local noise ordinances`
      };

      return {
        text: regionGuides[region] || regionGuides["default"]
      };
    }
  });

  // Safety guidelines
  server.addResourceTemplate({
    uriTemplate: "container://safety-guide/{container_type}",
    name: "Container Safety Guidelines",
    mimeType: "text/plain",
    arguments: [
      {
        name: "container_type",
        description: "Type of container",
        required: true,
      },
    ],
    async load({ container_type }) {
      const safetyGuides = {
        "standard": `Standard Container Safety:
- Don't exceed weight limits
- Load evenly from back to front
- Keep hazardous materials separate
- Ensure doors/latches are secured
- Don't climb into container`,

        "high": `High Container Safety:
- Use proper loading equipment
- Consider wind conditions
- Don't overload above rim
- Keep access clear
- Extra care with heavy materials`,

        "covered": `Covered Container Safety:
- Secure cover after loading
- Proper ventilation needed
- Check cover mechanism
- Weather considerations
- Keep cover access clear`
      };

      return {
        text: safetyGuides[container_type] || safetyGuides["standard"]
      };
    }
  });

  // Loading instructions
  server.addResourceTemplate({
    uriTemplate: "container://loading-guide/{material_type}",
    name: "Container Loading Instructions",
    mimeType: "text/plain",
    arguments: [
      {
        name: "material_type",
        description: "Type of material being loaded",
        required: true,
      },
    ],
    async load({ material_type }) {
      const loadingGuides = {
        "mixed": `Mixed Waste Loading Guide:
- Start with flat, heavy items
- Layer materials evenly
- Break down large items
- Fill gaps to maximize space
- Keep weight distributed`,

        "heavy": `Heavy Materials Guide:
- Start at container back
- Use equipment for heavy items
- Keep below side walls
- Distribute weight evenly
- Don't exceed weight limits`,

        "bulky": `Bulky Items Guide:
- Break down items if possible
- Stack efficiently
- Fill gaps with smaller items
- Secure loose materials
- Consider weight distribution`
      };

      return {
        text: loadingGuides[material_type] || "Loading guide not found for this material type"
      };
    }
  });
}