# Using Composite Flood Index (CFI) approach via Sentinel-1 VV and VH bands in Google Earth Engine for flood impact analysis.

## For the Flooding Impact Assessment in Mokwa town, Niger State, Nigeria (occured between May 28–29, 2025)
The impact of this flooding event had very signifiant damage with officials estimatings over 200 confirmed casualties and over 1,000 individuals missing. At least 121 others were injured, and the flooding destroyed 2,000 homes. This project aims to outline the extent of the flood event using Sentinel-1 SAR GRD dataset from GEE. 

Sentinel-1 SARGround Range Detected (GRD) scenes are processed using the Sentinel-1 Toolbox to generate a calibrated and an ortho-corrected product. The collection is updated daily. New assets are ingested within two days after they become available.

Specific shapefile of the ROI can be assessed at https://unosat.org/products/4139 and the link to the original GEE code: https://code.earthengine.google.com/c340828cc074818912a6069cc5c5be9e. 

A GEE webapp is also available as https://ee-geohazardrisk-mapping.projects.earthengine.app/view/june-2025-flood-impact-analysis-in-mokwa-town-niger-state

Documentation of the process is illustrated in this folder as "Mokwa Town flood code explanations" 

# Earth Engine Projects - Using Google Earth Engine (GEE) as a tool for remote sensing and Earth Observation (EO).  


## For the Flooding Assessment in Akosombo and its Environs
Using remote sensing, in this case Synthetic aperture radar (SAR) and GIS for evaluating the flooding extents for the 2023 inundation event in Akosombo, Ghana (West Africa). The application also incorprated SAR Image despeckling using refined the Lee Filter (Yommy et al., 2015) for efficient speckle noise removal and the improvement of image quality . The method is based on the well-known as Lee filter and applies the K-Nearest Neighbour (KNN) algorithm, which  is employed to adjust the number of neighbour pixels used within the sliding window.


### Overview on the SAR sensor
The SAR (Synthetic Aperture Radar) sensor is mounted satellite and points sideways instead of straight down (nadir). It is an active sensor that sends electromagnetic waves to the earth's surface and receives the reflected signal. The electromagnetic wave received by the sensor is called the measured backscatter. A SAR image is a 2D rendering of the measured backscatter.

### Benefits/advantages of using SAR data
a. An active sensor, used by SAR systems, functions as both the source and the receiver 

b. Unlike an optical sensor, a SAR sensor can operate during the day or night, independent of the sun, since it transmits its own signal. 

c. Active sensing also allows you to control the polarization of the transmitted electromagnetic waves. 

d. SAR can penetrate through clouds, smoke, and even vegetation, making it particularly useful during extreme weather events when optical sensors may be ineffective

### Results (Illustration of the User-Interface acquired from GEE)
![Akosombo_Flooding_SAR_extract](https://github.com/user-attachments/assets/2fbf857b-0eb1-4029-8ba7-cf8a2846e6c9)

### Link to the Webpage
https://ee-geohazardrisk-mapping.projects.earthengine.app/view/akosombofloodingsar

### Github link for Refined Lee Speckle filter
Applying a Refined Lee Speckle filter as coded in the SNAP 3.0 S1TBX:

https://github.com/senbox-org/s1tbx/blob/master/s1tbx-op-sar-processing/src/main/java/org/esa/s1tbx/sar/gpf/filtering/SpeckleFilters/RefinedLee.java Adapted by Guido Lemoine

### Reference
Yommy, A. S., Liu, R., & Wu, S. (2015, August). SAR image despeckling using refined Lee filter. In 2015 7th International Conference on Intelligent Human-Machine Systems and Cybernetics (Vol. 2, pp. 260-265). IEEE.


## West-African Climate Assessment tool: Case study for Ghana & Nigeria

Using remote sensing , GIS and other Earth Observatory System applications for climate assessment in West African countries

### Overview on MODIS Land Surface Temperature (LST) & Precipitation level Viewer 
This project is a Google Earth Engine (GEE) application that visualizes and analyzes Land Surface Temperature (LST) and Precipitation level data for Ghana and Nigeria. It allows users to select a year and month, visualize LST & Precipitation level data, as well as view a time series of both climate factor patterns/values for specific locations. The tool also provides a user-friendly interface for interaction, making it easy to explore the MODIS LST dataset and CHIRPS precipitation data over the region.

Futhermore, the base code is modular therby making the same assessment possible at any local and/or national level by changing a few parameters to suit the desired ROI.

Credit to https://github.com/Osman-Geomatics93/Sudan-Climate-Analysis-Tool-2024- for the inspiration.

### Goal
Visualize LST and Precipitation Data: Allow users to view MODIS Land Surface Temperature (LST) data & Rainfall Patterns.

Interactive Time Series: Let users click on the map to view a time series of LST values & rainfall patterns for any location.

User-friendly Interface: Provide a well-structured, clean UI webapp for year and month selection, data visualization, and chart generation.

### Data Sources
Land Surface Temperature: MODIS/061/MOD11A2

Rainfall Data: UCSB-CHG/CHIRPS/PENTAD

Administrative Boundaries: USDOS/LSIB_SIMPLE/2017

### Features
Temperature Analysis: MODIS-based LST data processing and visualization

Rainfall Patterns: CHIRPS precipitation data analysis

Interactive Maps: Toggle between temperature and rainfall layers

Time Series Charts: Visual representation of temporal climate patterns

Point Analysis: Click-based location-specific climate information

Custom Legend: Clear visualization of data ranges

### Methodology

![image](https://github.com/user-attachments/assets/2f49d070-4806-4894-8e06-eef090cbe88b)

### Selected Results
1. Land Surface Temperature (LST) in Nigeria on February 2002

![image](https://github.com/user-attachments/assets/79008f78-53c5-46e5-a1d4-290470887f49)

2. Precipitation levels time series from 1981 to 2024 in Accra, Ghana

![image](https://github.com/user-attachments/assets/955c0f05-b6ab-414d-89fe-0ddba98486b7)

### Google Earth Engine Webapps
https://ee-geohazardrisk-mapping.projects.earthengine.app/view/ghana-lst-assessment

https://ee-geohazardrisk-mapping.projects.earthengine.app/view/ghana-precipitation-assessment

https://ee-geohazardrisk-mapping.projects.earthengine.app/view/nigeria-lst-assessment

https://ee-geohazardrisk-mapping.projects.earthengine.app/view/nigeria-precipitation-assessment



