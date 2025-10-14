import { useState, useEffect } from "react";
import api from "../api/axiosConfig";

function SearchSuggestions({ query, onSelect }) {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query && query.length > 2) {
      setLoading(true);
      const timeoutId = setTimeout(async () => {
        try {
          const res = await api.get(`/products?search=${encodeURIComponent(query)}`);
          // Get unique categories and product names for suggestions
          const categories = [...new Set(res.data.map(p => p.category))];
          const productNames = res.data.map(p => p.name);
          
          setSuggestions([
            ...categories.slice(0, 3).map(cat => ({ type: 'category', text: cat })),
            ...productNames.slice(0, 3).map(name => ({ type: 'product', text: name }))
          ]);
        } catch (err) {
          console.error("Error fetching suggestions:", err);
          setSuggestions([]);
        } finally {
          setLoading(false);
        }
      }, 300); // Debounce search

      return () => clearTimeout(timeoutId);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  if (!query || query.length <= 2 || suggestions.length === 0) {
    return null;
  }

  return (
    <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-b-md shadow-lg z-50 max-h-60 overflow-y-auto">
      {loading ? (
        <div className="p-3 text-gray-500 text-center">Searching...</div>
      ) : (
        suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => onSelect(suggestion.text)}
            className="w-full text-left px-4 py-2 hover:bg-gray-100 border-b border-gray-100 last:border-b-0"
          >
            <div className="flex items-center">
              <span className="text-gray-400 mr-2">
                {suggestion.type === 'category' ? '📂' : '📦'}
              </span>
              <span className="text-gray-700">{suggestion.text}</span>
            </div>
          </button>
        ))
      )}
    </div>
  );
}

export default SearchSuggestions;
