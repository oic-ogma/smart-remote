// This #include statement was automatically added by the Particle IDE.
#include "Adafruit_BMP085/Adafruit_BMP085.h"
#define indexNumber 600
Adafruit_BMP085 sensor;

String irData="";
String sARRAY_ON = "2737,2521,982,710,972,721,965,1768,960,1795,929,1801,925,1808,923,771,913,777,916,54119,2732,2523,981,711,969,747,943,1794,932,1796,931,1802,923,1810,918,774,912,777,914,";
void setup() {
    // Initialize Photon onboard blue LED
    pinMode(D7, OUTPUT);
    // for particlu.function irReceive
    pinMode(D6, OUTPUT);
    // irDataPin
    pinMode(D2, INPUT);
    // irSend
    pinMode(D3, OUTPUT);
    Particle.variable("irData",irData);
    Particle.function("irReceive", irReceive);

    Particle.function("irSend",irSend);
    Particle.function("irSendOn", irSendOn);
    Particle.function("irSendOff", irSendOff);


    // Initialize Sensor BMP180
    if (!sensor.begin()) {
      Serial.println("No sensor found, please check wiring!");
      while (1) {}
    }
}


void loop() {
    //get temperature,pressure
    //PublishSensorInfo();
    //blinkLed();
    String irDat="亜";
    char stringConvertChars[2000];
    irDat.toCharArray(stringConvertChars, irDat.length()+1);
    Particle.variable("mojicode", (int)stringConvertChars[0]);
    delay(6000);
}

int irSend(String irData)
{
    char stringConvertChars[2000];
    irData.toCharArray(stringConvertChars, irData.length()+1);
    int irDataInt[300]={0};

    int valueLength = 0;
    int arrayIndex = 0;
    for(int i=0;i<irData.length();i++)
    {
        if(irDataInt[i] == 44)
        {
            switch (valueLength) {
            	case 5:
            	    irDataInt[arrayIndex] = (stringConvertChars[i - 5] - 48)*10000 + (stringConvertChars[i - 4] - 48)*1000 + (stringConvertChars[i - 3] - 48)*100 + (stringConvertChars[i - 2]- 48)*10 + (stringConvertChars[i - 1] - 48)*1;
            	    valueLength = 0;
            	    arrayIndex++;
            		break;
            	case 4:
                    irDataInt[arrayIndex] = (stringConvertChars[i - 4] - 48)*1000 + (stringConvertChars[i - 3] - 48)*100 + (stringConvertChars[i - 2]- 48)*10 + (stringConvertChars[i - 1] - 48)*1;
            	    valueLength = 0;
            		arrayIndex++;
            		break;
            	case 3:
            		irDataInt[arrayIndex] = (stringConvertChars[i - 3] - 48)*100 + (stringConvertChars[i - 2]- 48)*10 + (stringConvertChars[i - 1] - 48)*1;
            	    valueLength = 0;
            		arrayIndex++;
            		break;
            	case 2:
            		irDataInt[arrayIndex] = (stringConvertChars[i - 2]- 48)*10 + (stringConvertChars[i - 1] - 48)*1;
            	    valueLength = 0;
            		arrayIndex++;
            		break;
            	case 1:
            		irDataInt[arrayIndex] = (stringConvertChars[i - 1] - 48)*1;
            	    valueLength = 0;
            		arrayIndex++;
            		break;
            	default:
            		break;
            }
        }else
        {
            valueLength++;
        }
    }
    int timeLength;
	unsigned long timeStart;

	int countHighLow = sizeof( irDataInt ) / sizeof( irDataInt );
	for( int indexHighLow = 0; indexHighLow < countHighLow; indexHighLow++ )
	{
	    if(irDataInt[indexHighLow] == 0)
	    {
	        break;
	    }
		timeLength = irDataInt[indexHighLow];
		timeStart = micros();
		do
		{
			digitalWrite( D3, 1 - (indexHighLow % 2) );
			delayMicroseconds(8);

			digitalWrite( D3, 0 );
			delayMicroseconds(7);
		} while( timeLength > micros() - timeStart );
	}
	return 100;
}


int irSendOn(String command)
{
    int iTimeLength;
	unsigned long ulTimeStart;
    int ARRAY_ON[] = { 2737, 2521, 982, 710, 972, 721, 965, 1768, 960, 1795, 929, 1801, 925, 1808, 923, 771, 913, 777, 916, 54119, 2732, 2523, 981, 711, 969, 747, 943, 1794, 932, 1796, 931, 1802, 923, 1810, 918, 774, 912, 777, 914, };

	int iCountHighLow = sizeof( ARRAY_ON ) / sizeof( ARRAY_ON[0] );
	for( int iIndexHighLow = 0; iIndexHighLow < iCountHighLow; iIndexHighLow++ )
	{
		iTimeLength = ARRAY_ON[iIndexHighLow];
		ulTimeStart = micros();
		do
		{
			digitalWrite( D3, 1 - (iIndexHighLow % 2) );
			delayMicroseconds(8);

			digitalWrite( D3, 0 );
			delayMicroseconds(7);
		} while( iTimeLength > micros() - ulTimeStart );

	}

	return 100;
}

int irSendOff(String command)
{
    int iTimeLength;
	unsigned long ulTimeStart;
	int ARRAY_OFF[] = { 2717, 2543, 974, 718, 950, 1807, 918, 772, 911, 781, 908, 1826, 901, 789, 898, 1831, 899, 1835, 894, 54137, 2717, 2540, 994, 698, 968, 1792, 925, 767, 916, 774, 910, 1822, 909, 783, 899, 1832, 898, 1833, 895};

	int iCountHighLow = sizeof( ARRAY_OFF ) / sizeof( ARRAY_OFF[0] );
	for( int iIndexHighLow = 0; iIndexHighLow < iCountHighLow; iIndexHighLow++ )
	{
		iTimeLength = ARRAY_OFF[iIndexHighLow];
		ulTimeStart = micros();
		do
		{
			digitalWrite( D3, 1 - (iIndexHighLow % 2) );
			delayMicroseconds(8);

			digitalWrite( D3, 0 );
			delayMicroseconds(7);
		} while( iTimeLength > micros() - ulTimeStart );

	}

	return 200;
}

int irReceive(String command)
{
	unsigned long time;
	unsigned long mill;
    static int s_iState_prev = HIGH;
    static unsigned long s_ulMicros_prev = 0;
    digitalWrite(D6, HIGH);
    time = millis() + 5000;
    Particle.publish("start",(String)time);
    int iState;
    int flag = 0;
    while(1)
    {
        iState = digitalRead(D2);
        if( iState != s_iState_prev )
        {
	       s_iState_prev = iState;
	       unsigned long ulMicros = micros();
	       if (flag > 0)
	       {
	        irData = String(irData+(String)(ulMicros - s_ulMicros_prev));
	        irData = String(irData+",");
	       }
    	   s_ulMicros_prev = ulMicros;
    	   flag = 1;
        }
        if(time < millis())
        {
            break;
        }
    }
    Particle.publish("irData",irData);
    Particle.publish("end",(String)millis());
    Particle.variable("irData",irData);
    digitalWrite(D6, LOW);
    return 10;
}

// Publish Pressure, Altitude
void PublishSensorInfo(){
    Serial.print("Temperature = ");
    Serial.print(sensor.readTemperature());
    Serial.println(" *C");

    Serial.print("Pressure    = ");
    Serial.print(sensor.readPressure()/100.0);
    Serial.println(" hPa");

    char sensorInfo[64];
    sprintf(sensorInfo, "Temperature=%.2f °C, Pressure=%.2f hPa", sensor.readTemperature(), sensor.readPressure()/100.0);
    Particle.publish("PhotonTemp", sensorInfo);
    Particle.variable("Temperature",(String)sensor.readTemperature());
}


// Blink onboard LED
void blinkLed(){
    digitalWrite(D7, HIGH);
    delay(500);
    digitalWrite(D7, LOW);
    delay(500);
}
  
