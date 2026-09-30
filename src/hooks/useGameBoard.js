import { useState, useEffect, useMemo, useCallback } from 'react';
import { partyData, matchesData, streamsData, defaultFeatured } from '../data/games';
import { getDataByFilter } from '../utils/filterHelpers';
import { addToPanel } from '../utils/addToPanel';

export const useGameBoard = (isLoggedIn, loggedUser, userAvatar) => {
  const [filterType, setFilterType] = useState('party');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState(defaultFeatured);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

    // Simulating data loading
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        // Simulating API call
        await new Promise((resolve) => setTimeout(resolve, 800));
        
        // Simulating random error
        if (Math.random() < 0.1) {
          throw new Error('Error al cargar los datos');
        }
      } catch (error) {
        console.error('Error en la carga de datos:', error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);


  const filteredData = useMemo(() => {
    const data = getDataByFilter(filterType, partyData, matchesData, streamsData);
    if (!searchTerm.trim()) return data;
    return data.filter((item) =>
      item.game.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [filterType, searchTerm]); 

  const currentItem = useMemo(() => {
    if (filteredData.length === 0) return defaultFeatured;
    const exists = filteredData.some(item => item.id === selectedItem.id);
    return exists ? selectedItem : filteredData[0];
  }, [filteredData, selectedItem]); 

  const handleSelectItem = useCallback((item) => {
    setSelectedItem(item);
  }, []); 

  const handleSetFilterType = useCallback((type) => {
    setFilterType(type);
  }, []);

  const handleSetSearchTerm = useCallback((term) => {
    setSearchTerm(term);
  }, []);

  const handleClearFilter = useCallback(() => {
    setSearchTerm('');
    setFilterType('party');
    setSelectedItem(defaultFeatured);
  }, []); 

  const handleAddToPanel = useCallback((item) => {
    if (!isLoggedIn) return;
    const updatedItem = addToPanel(item, loggedUser, userAvatar);
    setSelectedItem(updatedItem);
  }, [isLoggedIn, loggedUser, userAvatar]); 

  return {
    filterType,
    searchTerm,
    filteredData,
    currentItem,
    isLoading,
    isError, 
    handleSelectItem,
    handleSetFilterType,
    handleSetSearchTerm,
    handleClearFilter,
    handleAddToPanel,
  };
};