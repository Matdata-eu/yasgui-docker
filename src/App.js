import React, { useEffect } from "react";

import GeoPlugin from "yasgui-geo-tg";

export default function App() {
  useEffect(() => {
    // Yasgui is loaded from public/yasgui/yasgui.min.js and is available as a global variable
    // The UMD build exports the constructor as window.Yasgui.default or window.Yasgui.Yasgui
    const Yasgui = window.Yasgui?.default || window.Yasgui?.Yasgui;
    
    if (!Yasgui) {
      console.error("Yasgui is not loaded yet");
      return;
    }
    
    // Register the geo plugin
    if (Yasgui.Yasr) {
      Yasgui.Yasr.registerPlugin("geo", GeoPlugin);
    }
    
    var config =
    {
      /**
       * Change the default request configuration, such as the headers
       * and default yasgui endpoint.
       * Define these fields as plain values, or as a getter function
       */
      requestConfig: {
        endpoint: 'https://change.to.default.endpoint/sparql'
      },
        
      // Allow resizing of the Yasqe editor
      resizeable: true,

      // Whether to autofocus on Yasqe on page load
      autofocus: true,

      // Use the default endpoint when a new tab is opened
      copyEndpointOnNewTab: true,

      // Configuring which endpoints appear in the endpoint catalogue list
      endpointCatalogueOptions: {
        getData: () => {
          return [
            //List of objects should contain the endpoint field
            //Feel free to include any other fields (e.g. a description or icon
            //that you'd like to use when rendering)
            {
              endpoint: "https://data-interop.era.europa.eu/api/sparql"
            },
            {
              endpoint: "https://dbpedia.org/sparql"
            },
            {
              endpoint: "https://query.wikidata.org"
            }
            // ...
          ];
        },
        //Data object keys that are used for filtering. The 'endpoint' key already used by default
        keys: [],
        //Data argument contains a `value` property for the matched data object
        //Source argument is the suggestion DOM element to append your rendered item to
        renderItem: (data, source) => {
          const contentDiv = document.createElement("div");
          contentDiv.innerText = data.value.endpoint;
          source.appendChild(contentDiv);
        }
      },
      
      yasr: {
        pluginOrder: ['table', 'response', 'geo'], // Enable geo plugin alongside default table
        defaultPlugin: 'table',
      },
    };
    
    // eslint-disable-next-line no-unused-vars
    const yasgui = new Yasgui(document.getElementById("yasgui"), config);
    
    return () => {};
  }, []);

  return <div id="yasgui" />;
}