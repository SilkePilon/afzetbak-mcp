import { ApiClient } from './api-client.js';

interface GarbageType {
  slug: string;
  name: string;
  type: string;
  description?: string;
  suitable_materials?: string[];
}

interface SizeType {
  slug: string;
  name: string;
  price: number;
}

export interface Container {
  id: string;
  name: string;
  size: string;
  price: number;
  description: string;
  suitableFor: string[];
  type: string;
}

export class ContainerService {
  public static async getContainers() {
    const [garbagesResponse, sizesResponse] = await Promise.all([
      ApiClient.getGarbages(),
      ApiClient.getSizes()
    ]);
    
    const garbages = garbagesResponse as GarbageType[];
    const sizes = sizesResponse as SizeType[];
    
    return this.combineData(garbages, sizes);
  }

  public static async getContainersByType(type: string) {
    const containers = await this.getContainers();
    return containers.filter(container => 
      container.type.toLowerCase() === type.toLowerCase()
    );
  }

  public static async getContainersBySize(size: string) {
    const containers = await this.getContainers();
    return containers.filter(container => 
      container.size.toLowerCase().includes(size.toLowerCase())
    );
  }

  public static async getContainerInfo(containerId: string) {
    const containers = await this.getContainers();
    return containers.find(container => container.id === containerId);
  }

  public static async getPriceRange() {
    const containers = await this.getContainers();
    const prices = containers.map(c => c.price);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices)
    };
  }

  public static async getSizes() {
    const sizesData = await ApiClient.getSizes() as SizeType[];
    return sizesData.map(size => size.name);
  }

  public static async getContainerTypes() {
    const garbages = await ApiClient.getGarbages() as GarbageType[];
    return [...new Set(garbages.map(g => g.type))];
  }

  private static combineData(garbages: GarbageType[], sizes: SizeType[]): Container[] {
    return garbages.flatMap(garbage => 
      sizes.map(size => ({
        id: `${garbage.slug}-${size.slug}`,
        name: `${garbage.name} ${size.name}`,
        size: size.name,
        price: size.price,
        description: garbage.description || '',
        suitableFor: garbage.suitable_materials || [],
        type: garbage.type
      }))
    );
  }
}