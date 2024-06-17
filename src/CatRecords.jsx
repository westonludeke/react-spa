import React, { useEffect } from 'react';

const CatRecords = () => {
  useEffect(() => {
    const setupCatRecords = async () => {
      if (typeof window === 'undefined' || typeof CommandBar === 'undefined') {
        console.error('CommandBar is not available in CatRecords component.');
        return;
      }

      try {
        console.log('Adding cat records to CommandBar...');
        CommandBar.addRecords('cats', [
          { label: 'Chucho', id: '1' },
          { label: 'Melicio', id: '2' },
          { label: 'Mini', id: '3' }
        ], {
          labelKey: "label"
        });
        console.log('Cat records added successfully.');

        console.log('Adding cat record action...');
        CommandBar.addRecordAction('cats', {
          text: 'View Details',
          name: 'viewCat',
          template: {
            type: 'callback',
            value: 'viewCatDetails'
          }
        });
        console.log('Cat record action added successfully.');
      } catch (error) {
        console.error('Failed to set up CommandBar records or actions:', error);
      }
    };

    setupCatRecords();
  }, []);

  return null; // This component does not render anything
};

export default CatRecords;
