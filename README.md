# @afzetbak/mcp-server

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6)

MCP Server for afzetbak.nl providing real-time container and dumpster rental information through the Model Context Protocol.

## 📋 Features

- Real-time container availability and pricing
- Detailed container specifications and sizes
- Material acceptance guidelines
- Location-specific regulations
- Safety guidelines and loading instructions
- Customer reviews integration

## 🚀 Installation

```bash
npm install @afzetbak/mcp-server
```

## ✨ Usage

### Running as stdio Server

```bash
npm start
```

### Running as HTTP Server

```bash
npm run start:http
```

By default, the HTTP server runs on port 3001. You can change this by setting the PORT environment variable:

```bash
PORT=8080 npm run start:http
```

## 🛠️ Available Tools

The MCP server provides several tools for interacting with afzetbak.nl services:

- `get_containers`: List all available containers with real-time pricing
- `get_containers_by_type`: Filter containers by type
- `get_containers_by_size`: Filter containers by size
- `get_container_info`: Get detailed information about a specific container
- `get_price_range`: Get current min/max container prices
- `get_available_sizes`: List all available container sizes
- `get_container_types`: List all container types
- `get_stats`: Get current statistics
- `get_reviews`: Get latest customer reviews
- `get_recent_orders`: Get recent container orders

## 📚 Resources

The server provides helpful resource templates for:

- Container size guides
- Material acceptance guidelines
- Container placement requirements
- Regional regulations
- Safety guidelines
- Loading instructions

## 🌐 API Integration

The server integrates with afzetbak.nl's internal API to provide real-time information about:

- Container availability
- Pricing
- Customer reviews
- Recent orders
- Usage statistics

## 🔧 Development

```bash
# Install dependencies
npm install

# Run in development mode with auto-reload
npm run dev

# Build for production
npm run build
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🏢 About afzetbak.nl

afzetbak.nl is a leading container and dumpster rental service in the Netherlands, providing efficient waste management solutions for construction, renovation, and cleanup projects.
