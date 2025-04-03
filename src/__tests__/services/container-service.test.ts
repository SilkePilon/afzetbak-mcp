import { ContainerService } from '../../core/services/container-service.js';
import { ApiClient } from '../../core/services/api-client.js';

jest.mock('../../core/services/api-client.js');

describe('ContainerService', () => {
  const mockGarbages = [
    {
      slug: 'construction',
      name: 'Construction',
      type: 'building',
      description: 'For construction waste',
      suitable_materials: ['concrete', 'bricks']
    }
  ];

  const mockSizes = [
    {
      slug: '6m3',
      name: '6m³',
      price: 199.99
    }
  ];

  beforeEach(() => {
    jest.resetAllMocks();
    (ApiClient.getGarbages as jest.Mock).mockResolvedValue(mockGarbages);
    (ApiClient.getSizes as jest.Mock).mockResolvedValue(mockSizes);
  });

  describe('getContainers', () => {
    it('should combine garbage and size data correctly', async () => {
      const containers = await ContainerService.getContainers();
      
      expect(containers).toHaveLength(1);
      expect(containers[0]).toEqual({
        id: 'construction-6m3',
        name: 'Construction 6m³',
        size: '6m³',
        price: 199.99,
        description: 'For construction waste',
        suitableFor: ['concrete', 'bricks'],
        type: 'building'
      });

      expect(ApiClient.getGarbages).toHaveBeenCalledTimes(1);
      expect(ApiClient.getSizes).toHaveBeenCalledTimes(1);
    });
  });

  describe('getContainersByType', () => {
    it('should filter containers by type case-insensitively', async () => {
      const containers = await ContainerService.getContainersByType('BuIlDiNg');
      
      expect(containers).toHaveLength(1);
      expect(containers[0].type.toLowerCase()).toBe('building');
    });

    it('should return empty array for non-matching type', async () => {
      const containers = await ContainerService.getContainersByType('nonexistent');
      expect(containers).toHaveLength(0);
    });
  });

  describe('getPriceRange', () => {
    it('should return correct min and max prices', async () => {
      const range = await ContainerService.getPriceRange();
      
      expect(range).toEqual({
        min: 199.99,
        max: 199.99
      });
    });
  });
});