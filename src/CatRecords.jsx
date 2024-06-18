import React, { useEffect } from 'react';

const CatRecords = () => {
  useEffect(() => {
    const setupCommandBar = () => {
      if (typeof window === 'undefined' || typeof CommandBar === 'undefined') {
        console.error('CommandBar is not available.');
        return;
      }

      CommandBar.boot();

      try {
        // Define and add a custom component
        CommandBar.addComponent("catListDisplay", {
          mount: (elem) => ({
            render: (cats) => {
              console.log('Rendering cats:', cats);
              const html = cats.map(cat => `
                <div style="padding: 10px; border-bottom: 1px solid #ccc;">
                  <h4>${cat.name}</h4>
                </div>
              `).join('');
              elem.innerHTML = `<div>${html}</div>`;
            },
            unmount: () => {
              elem.innerHTML = ''; // Clean up when the component is not in use
            }
          })
        });

        // Add a command that uses a callback to display cats using the custom component
        CommandBar.addCommand({
          name: 'displayCatList',
          text: 'Cat List',
          template: {
            type: 'callback',
            value: 'displayCatList'
          }
        });

        // Setup callback to provide data to the component
        CommandBar.addCallback('displayCatList', () => {
          const cats = [
            { name: 'Chucho', id: '0' },
            { name: 'Melicio', id: '1' },
            { name: 'Mini', id: '2' }
          ];
          console.log('Callback triggered, cats:', cats);
          document.getElementById('catDisplayArea').innerHTML = cats.map(cat => `<div>${cat.name}</div>`).join('');
          return cats;  // Ensure this returns the expected array
        });

      } catch (err) {
        console.error('Error setting up CommandBar:', err);
      }
    };

    setupCommandBar();
  }, []);

  return (
    <div>
      <div id="catDisplayArea"></div>
    </div>
  );
};

export default CatRecords;
