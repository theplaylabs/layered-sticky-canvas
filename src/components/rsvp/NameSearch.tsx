import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface NameSearchProps {
  nameQuery: string;
  setNameQuery: (query: string) => void;
  suggestions: string[];
  handleNameSelect: (name: string) => void;
}

const NameSearch: React.FC<NameSearchProps> = ({
  nameQuery,
  setNameQuery,
  suggestions,
  handleNameSelect,
}) => {
  return (
    <div className="space-y-4">
      <Label htmlFor="name-search" className="text-xl font-primary font-medium" style={{ color: '#738a6e' }}>
        What's your name?
      </Label>
      <div className="relative">
        <Input
          id="name-search"
          type="text"
          value={nameQuery}
          onChange={(e) => setNameQuery(e.target.value)}
          placeholder="Start typing your name..."
          className="w-full rounded-none focus-visible:ring-2"
          style={{ 
            '--tw-ring-color': '#738a6e'
          } as React.CSSProperties}
        />
        {suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 bg-background border border-border rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
            {suggestions.map((name, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleNameSelect(name)}
                className="w-full text-left px-4 py-2 hover:bg-accent transition-colors"
              >
                {name}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NameSearch;