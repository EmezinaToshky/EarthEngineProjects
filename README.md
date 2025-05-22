# Earth Engine Projects - Using Google Earth Engine (GEE) as a tool for remote sensing and Earth Observation (EO).  


## For the Flooding Assessment in Akosombo and its Environs
Using remote sensing, in this case Synthetic aperture radar (SAR) and GIS for evaluating the flooding extents for the 2023 inundation event in Akosombo, Ghana (West Africa). The application also incorprated SAR Image despeckling using refined the Lee Filter (Yommy et al., 2015) for efficient speckle noise removal and the improvement of image quality . The method is based on the well-known as Lee filter and applies the K-Nearest Neighbour (KNN) algorithm, which  is employed to adjust the number of neighbour pixels used within the sliding window.

###Using Sentinel-1 ground range detection satellites in Google Earth Engine (GEE)

### Overview on the SAR sensor
The SAR (Synthetic Aperture Radar) sensor is mounted satellite and points sideways instead of straight down (nadir). It is an active sensor that sends electromagnetic waves to the earth's surface and receives the reflected signal. The electromagnetic wave received by the sensor is called the measured backscatter. A SAR image is a 2D rendering of the measured backscatter.

### Benefits/advantages of using SAR data
a. An active sensor, used by SAR systems, functions as both the source and the receiver 
b. Unlike an optical sensor, a SAR sensor can operate during the day or night, independent of the sun, since it transmits its own signal. 
c. Active sensing also allows you to control the polarization of the transmitted electromagnetic waves. 
d. SAR can penetrate through clouds, smoke, and even vegetation, making it particularly useful during extreme weather events when optical sensors may be ineffective

### Link to the Webpage
https://ee-geohazardrisk-mapping.projects.earthengine.app/view/akosombofloodingsar

### Github link for Refined Lee Speckle filter
Applying a Refined Lee Speckle filter as coded in the SNAP 3.0 S1TBX:

https://github.com/senbox-org/s1tbx/blob/master/s1tbx-op-sar-processing/src/main/java/org/esa/s1tbx/sar/gpf/filtering/SpeckleFilters/RefinedLee.java Adapted by Guido Lemoine

### Reference
Yommy, A. S., Liu, R., & Wu, S. (2015, August). SAR image despeckling using refined Lee filter. In 2015 7th International Conference on Intelligent Human-Machine Systems and Cybernetics (Vol. 2, pp. 260-265). IEEE.

