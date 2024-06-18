import React, { useEffect } from 'react';

const CatRecords = () => {
  useEffect(() => {
    const setupCommandBar = () => {
      if (typeof window === 'undefined' || typeof CommandBar === 'undefined') {
        console.error('CommandBar is not available.');
        return;
      }

      console.log('Booting CommandBar...');
      CommandBar.boot();

      // Define and add a custom component
      console.log('Adding custom component...');
      CommandBar.addComponent("catListDisplay", "Detailed Cat List", {
        mount: (elem) => ({
          render: () => {
            const catRecords = [
              { name: 'Chucho', id: '0' },
              { name: 'Melicio', id: '1' },
              { name: 'Mini', id: '2' }
            ];
            console.log('Rendering cats:', catRecords);
            let html = '';

            if (Array.isArray(catRecords)) {
              console.log('catRecords is an array');
              html = catRecords.map(cat => {
                if (cat && cat.name) {
                  return `
                    <div style="padding: 5px;">
                      <h4>${cat.name}</h4>
                    </div>
                  `;
                }
                return '';
              }).join('');
            } else if (typeof catRecords === 'object' && catRecords !== null) {
              console.log('catRecords is an object');
              html = Object.entries(catRecords).map(([key, cat]) => {
                if (cat && cat.name) {
                  return `
                    <div style="padding: 5px;">
                      <h2>Cat List:</h2>
                      <h4>${cat.name}</h4>
                    </div>
                  `;
                }
                return '';
              }).join('');
            } else {
              console.log('No cats available');
              html = '<div>No cats available</div>';
            }

            elem.innerHTML = `<div style="padding: 5px;">${html}</div>`;
          },
          unmount: () => {
            console.log('Unmounting component');
            elem.innerHTML = ''; // Clean up when the component is not in use
          }
        })
      });

      // Define the cat records using addRecords
      console.log('Adding records...');
      const catRecords = [
        { name: 'Chucho', id: '0' },
        { name: 'Melicio', id: '1' },
        { name: 'Mini', id: '2' }
      ];
      CommandBar.addRecords("cats", catRecords, {
        labelKey: 'name',
        content: { type: 'component', value: 'catListDisplay' }
      });

      // Add record action to display cats using the custom component
      console.log('Adding record action...');
      CommandBar.addRecordAction('cats', {
        text: 'View Cat Details',
        name: 'viewCatDetails',
        template: {
          type: 'callback',
          value: 'displayCatList'
        }
      });

      // Add a command that triggers the custom component rendering
      console.log('Adding command...');
      CommandBar.addCommand({
        name: 'displayCatList',
        text: 'Cat List',
        template: {
          type: 'callback',
          value: 'displayCatList'
        }
      });

      // Setup callback to provide data to the component
      console.log('Setting up callback...');
      CommandBar.addCallback('displayCatList', () => {
        console.log('Callback triggered, cats:', catRecords);
        CommandBar.updateComponent('catListDisplay', catRecords);
      });

    };

    setupCommandBar();
  }, []);

  return null; // This component does not render anything itself
};

export default CatRecords;
