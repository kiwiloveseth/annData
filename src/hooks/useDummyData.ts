import { useState, useEffect } from 'react';

interface UseDummyDataReturn<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export const useDummyData = <T>(dataFile: string): UseDummyDataReturn<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const response = await fetch(`/src/data/${dataFile}.json`);
        if (!response.ok) {
          throw new Error(`Failed to load ${dataFile} data`);
        }
        
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [dataFile]);

  return { data, loading, error };
};

// Static data imports for direct use
import cropsData from '../data/crops.json';
import marketplaceData from '../data/marketplace.json';
import traceabilityData from '../data/traceability.json';
import profileData from '../data/profile.json';

export const useStaticData = () => {
  return {
    crops: cropsData,
    marketplace: marketplaceData,
    traceability: traceabilityData,
    profile: profileData,
  };
};