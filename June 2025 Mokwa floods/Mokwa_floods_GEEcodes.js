// Step 1: Load Sentinel-1 SAR Collection
var collection = ee.ImageCollection('COPERNICUS/S1_GRD')
  .filter(ee.Filter.eq('instrumentMode', 'IW'))
  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'))
  .filterBounds(dt);     


// Step 2: Define Before and After Periods
var before = collection.filterDate('2024-11-01', '2025-01-29');//Before flooding event
var after = collection.filterDate('2025-05-30', '2025-06-17'); // After flooding event

print(before);
print(after);

var beforeVV = before.select('VV').mosaic().clip(dt);
var afterVV = after.select('VV').mosaic().clip(dt);
var beforeVH = before.select('VH').mosaic().clip(dt);
var afterVH = after.select('VH').mosaic().clip(dt);

// Step 3: Convert from dB to linear scale (optional but better for calculation)
function toLinear(img) {
  return ee.Image(10).pow(img.divide(10));
}
var beforeVV_lin = toLinear(beforeVV);
var afterVV_lin = toLinear(afterVV);
var beforeVH_lin = toLinear(beforeVH);
var afterVH_lin = toLinear(afterVH);

// Step 4: Compute normalized difference of backscatter drops
var diffVV = beforeVV_lin.subtract(afterVV_lin).divide(beforeVV_lin);
var diffVH = beforeVH_lin.subtract(afterVH_lin).divide(beforeVH_lin);

// Step 5: Composite Flood Index (CFI) - weighted or averaged
//var floodIndex = diffVV.add(diffVH).divide(2);  // Simple average

var floodIndex = diffVV.multiply(0.6).add(diffVH.multiply(0.4)); // Applying a weighted average
// Optional: use weighted average if you prefer, e.g., floodIndex = diffVV.multiply(0.6).add(diffVH.multiply(0.4));

// Step 6: Apply threshold to define flooded areas
var floodMask = floodIndex.gt(0.30);  // Tune this threshold (0.3–0.5 range works well)

// Step 7: Mask and Display
var flood_masked = floodMask.updateMask(floodMask);
Map.centerObject(dt, 12);
Map.addLayer(floodIndex, {min: 0, max: 0.8, palette: ['white', 'blue']}, 'Flood Index');
Map.addLayer(flood_masked, {palette: ['0000FF']}, 'Flooded Areas (Composite Index)');

// Step 8: Statistics on the study area
print('Total District Area (Ha)', dt.area().divide(10000));

var stats = flood_masked.multiply(ee.Image.pixelArea()).reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: dt,
  scale: 30,
  maxPixels: 1e10,
  tileScale: 16
});

print(stats);
var flood_area = ee.Number(stats.get('constant')).divide(10000).round();
print('Flooded Area (Ha)', flood_area);

// Step 9: Create legend title for Google Earth Engine URL user interface 

// Set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
 
// Create legend title
var legendTitle = ui.Label({
  value: 'Legend',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
 
// Add the title to the panel
legend.add(legendTitle);
 
// Creates and styles 1 row of the legend.
var makeRow = function(color, name) {
 
      // Create the label that is actually the colored box.
      var colorBox = ui.Label({
        style: {
          backgroundColor: color,
          // Use padding to give the box height and width.
          padding: '8px',
          margin: '0 0 4px 0'
        }
      });
 
      // Create the label filled with the description text.
      var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px'}
      });
 
      // return the panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
 
//  Palette with the colors
var palette =['White', 'Blue'];
 
// name of the legend
var names = ['Areas not covered in water','Areas covered in water (i.e., Water bodies and flooded regions)'];
 
// Add color and and names
for (var i = 0; i <2; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
 
// add legend to map (alternatively you can also print the legend to the console)
Map.add(legend);

// set position of panel
var title = ui.Panel({
  style: {
    position: 'top-center',
    padding: '8px 15px'
  }
});
 
// Create legend title
var mapTitle = ui.Label({
  value: 'Flood impact analysis in Mokwa Town, Niger Local Government Area, Niger State, Nigeria as of early June 2025',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
 
// Add the title to the panel
title.add(mapTitle);
Map.add(title);

// Step 10: Quantifying the number of flooded buildings
// Function to import Google Building Footprint and count flooded houses
function countFloodedHouses() {
  var buildings = ee.FeatureCollection('GOOGLE/Research/open-buildings/v1/polygons')
                      .filterBounds(dt);

  var floodedBuildings = buildings.filterBounds(flood_masked.geometry());

  var floodedBuildingsCount = floodedBuildings.size();

  print('Number of Flooded Houses:', floodedBuildingsCount);
}

countFloodedHouses();

/*
// Export the image to your Google Drive account.
Export.image.toDrive({
  image: flood_masked,
  description: 'Flooded regions (a composite index VV+VH)',
  folder: 'Mokwa_NigerState_Flooding_June2025',
  region: dt,
  scale: 1000,
  crs: 'EPSG:4326',
  maxPixels: 1e10}); 
*/

// Enlarged UI Panel with subtitles and better layout
var panel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {
    width: '500px',  // Increased width
    padding: '10px',
    backgroundColor: '#f7f7f7',
    fontSize: '16px'
  }
});


// Section 1: Title
panel.add(ui.Label({
  value: 'Composite Flood Index (CFI) using Sentinel-1 VV and VH bands in Google Earth Engine',
  style: { fontSize: '22px', fontWeight: 'bold', margin: '10px 0' }
}));

// Section 2: Description

// Add message about dataset availability
panel.add(ui.Label({
  value: 'This cathographic illustration denotes the composite flood index (CFI) via Sentinel-1 bands VV and VH bands ' + 
         ' available in Google Earth Engine.' +
         ' This adaptation took into account the ROI dynamic (i.e, urban + vegetated) to effectively carry out'+
         '  the flood risk assessments.',
  style: { 
    fontSize: '14px', 
    color: 'red',  // Makes the message stand out
    margin: '5px 0',
    fontWeight: 'bold'
  }
}));

// Add MORE messages on the fatures and advantages
panel.add(ui.Label({ 
  value: 'a) VV & VH used together :',
  style: { 
    fontSize: '14px', 
    color: 'blue',
    margin: '5px 0',
    fontWeight: 'bold'
  }
}));

panel.add(ui.Label({ 
  value: 'Maximizes accuracy in diverse land cover (urban + vegetation)',
  style: { 
    fontSize: '14px', 
    color: 'blue',
    margin: '5px 0',
    fontWeight: 'bold'
  }
}));

panel.add(ui.Label({ 
  value: 'b) Normalized change : ',
  style: { 
    fontSize: '14px', 
    color: 'blue',
    margin: '5px 0',
    fontWeight: 'bold'
  }
}));

panel.add(ui.Label({ 
  value: 'Captures meaningful backscatter drop patterns',
  style: { 
    fontSize: '14px', 
    color: 'blue',
    margin: '5px 0',
    fontWeight: 'bold'
  }
}));

panel.add(ui.Label({ 
  value: 'c) Linear conversion : ',
  style: { 
    fontSize: '14px', 
    color: 'blue',
    margin: '5px 0',
    fontWeight: 'bold'
  }
}));

panel.add(ui.Label({ 
  value: 'Improves math integrity of flood calculations',
  style: { 
    fontSize: '14px', 
    color: 'blue',
    margin: '5px 0',
    fontWeight: 'bold'
  }
}));

panel.add(ui.Label({ 
  value: 'd) Thresholding  : ',
  style: { 
    fontSize: '14px', 
    color: 'blue',
    margin: '5px 0',
    fontWeight: 'bold'
  }
}));

panel.add(ui.Label({ 
  value: 'Classifies flooded areas based on percent backscatter changes',
  style: { 
    fontSize: '14px', 
    color: 'blue',
    margin: '5px 0',
    fontWeight: 'bold'
  }
}));


panel.add(ui.Label({ 
  value: 'e) Modular design    : ',
  style: { 
    fontSize: '14px', 
    color: 'blue',
    margin: '5px 0',
    fontWeight: 'bold'
  }
}));

panel.add(ui.Label({ 
  value: 'Easy to tune, test, and improve over time',
  style: { 
    fontSize: '14px', 
    color: 'blue',
    margin: '5px 0',
    fontWeight: 'bold'
  }
}));


//Hyperlinks Attachment

// Creating hyperlink for Sentinel-1 Algorithms Documentation 
var linkLabel1 = ui.Label({
  value: '🌍 Visit Sentinel-1 Algorithms Documentation',
  style: { 
    color: 'green', 
    textDecoration: 'underline', 
    margin: '5px 0', 
    fontSize: '14px'
  }
}).setUrl('https://developers.google.com/earth-engine/guides/sentinel1');

// Creating a GRMI website hyperlink button (Creating the clickable label)
var linkLabel2 = ui.Label({
  value: '🌍 App created by GeoHazards Risk Mapping Init.,(GRMI)',
  style: { 
    color: 'blue', 
    textDecoration: 'underline', 
    margin: '5px 0', 
    fontSize: '14px'
  }
}).setUrl('https://www.georiskmap.org/');  // Sets the URL properly

// To add to the panel
panel.add(linkLabel1);
panel.add(linkLabel2);

// Add main panel to UI
ui.root.insert(0, panel);