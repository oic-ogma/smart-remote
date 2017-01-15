// This #include statement was automatically added by the Particle IDE.
#include "Adafruit_BMP085/Adafruit_BMP085.h"
#define indexNumber 600
Adafruit_BMP085 sensor;

String irSendDataBuff = "";
String irData1 = "";
String irData2 = "";
String temperature = "";
String pressure = "";
String motion = "";
char irSendData[50][1000];
unsigned long motionTime;

void setup() {
  // Initialize Photon onboard blue LED
  pinMode(D7, OUTPUT);
  // for particlu.function irReceive
  pinMode(D6, OUTPUT);
  // for motion sensor
  pinMode(D4, INPUT);
  // irDataPin
  pinMode(D2, INPUT);
  // irSend
  pinMode(D3, OUTPUT);

  Particle.function("irReceive", irReceive);
  Particle.function("irSend", irSend);
  Particle.function("irAddData",irAddData);
  Particle.function("irTestSend",irTestSend);

  Particle.variable("irData1",irData1);
  Particle.variable("irData2",irData2);
  Particle.variable("temperature",temperature);
  Particle.variable("pressure",pressure);
  Particle.variable("motion",motion);

  motionTime = millis();

  // Initialize Sensor BMP180
  // this delete will be usage fault!not delete!!
  if (!sensor.begin()) {
    Serial.println("No sensor found, please check wiring!");
    while (1) {}
  }
}


void loop() {
  // motion sensor
  if (motionTime < millis()) {
    if (analogRead(A0) > 2000) {
      motion = "1";
      Particle.variable("motion", motion);
      motionTime = millis() + 30000;
    } else {
      motion = "0";
      Particle.variable("motion", motion);
      motionTime = millis();
    }
  }

  // get temperature,pressure
  PublishSensorInfo();
  delay(5000);
}

int irSend(String index) {
  if (index.toInt() < 0 || 50 < index.toInt()) {
    return 1;
  }
  else {
    String charsConvertString = String(irSendData[index.toInt()]);
    char stringConvertChars[1000];
    charsConvertString.toCharArray(stringConvertChars, charsConvertString.length());
    int irDataInt[400]={0};

    int valueLength = 0;
    int arrayIndex = 0;
    for (int i=0;i<charsConvertString.length();i++) {
      if (stringConvertChars[i] == 44) {
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
      }
      else {
        valueLength++;
      }
    }

  int timeLength;
	unsigned long timeStart;
	int countHighLow = sizeof(irDataInt) / sizeof(irDataInt[0]);
	for (int indexHighLow = 0; indexHighLow < countHighLow; indexHighLow++ ) {
		timeLength = irDataInt[indexHighLow]*100;
		timeStart = micros();
		do {
  		digitalWrite(D3, 1 - (indexHighLow % 2));
  		delayMicroseconds(8);
			digitalWrite(D3, 0);
			delayMicroseconds(7);
		}
    while(timeLength > micros() - timeStart);
  }
	return 0;
  }
}

int irAddData(String irData) {
  int index = irData.charAt(0)-58;
  if (index < 0 || 50 < index) {
    return 1;
  }
  char buff[1000];
  irSendDataBuff = "";
  irSendDataBuff = String(irSendData[index]);

  irData.remove(0,1);
  if (irData.charAt(0) != 44 && irSendDataBuff.charAt(irSendDataBuff.length()-1) != 44 && irSendDataBuff != "") {
    irSendDataBuff += ",";
  }
  if (irData.charAt(0) == 44 && irSendDataBuff.charAt(irSendDataBuff.length()-1) == 44) {
    irSendDataBuff += "0";
  }
  irSendDataBuff += irData;
  irSendDataBuff.toCharArray(irSendData[index], 1000);
  return 0;
}

int irSend(String index) {
  if (index.toInt() < 0 || 50 < index.toInt()) {
    return 1;
  }
  else {
    String charsConvertString = String(irSendData[index.toInt()]);
    Particle.publish("irData",charsConvertString);
    char stringConvertChars[1000];
    charsConvertString.toCharArray(stringConvertChars, charsConvertString.length());
    int irDataInt[400]={0};

    int valueLength = 0;
    int arrayIndex = 0;
    for (int i=0;i<charsConvertString.length();i++) {
      if (stringConvertChars[i] == 44) {
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
      }
      else {
        valueLength++;
      }
    }

    int timeLength;
    unsigned long timeStart;

    int countHighLow = sizeof(irDataInt) / sizeof(irDataInt[0]);
    for (int indexHighLow = 0; indexHighLow < countHighLow; indexHighLow++ ) {
    	timeLength = irDataInt[indexHighLow]*100;
    	timeStart = micros();
    	do {
    		digitalWrite(D3, 1 - (indexHighLow % 2));
    		delayMicroseconds(8);

    		digitalWrite(D3, 0);
    		delayMicroseconds(7);
    	} while (timeLength > micros() - timeStart);
    }
    Particle.publish("Send","send");
    return 0;
  }
}

int irTestSend(String command) {
  String charsConvertString = irData1 + irData2;
  Particle.publish("irData",charsConvertString);
  char stringConvertChars[1000];
  charsConvertString.toCharArray(stringConvertChars, charsConvertString.length());
  int irDataInt[400]={0};

  int valueLength = 0;
  int arrayIndex = 0;
  for (int i=0;i<charsConvertString.length();i++) {
    if (stringConvertChars[i] == 44) {
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
    }
    else {
      valueLength++;
    }
  }

  int timeLength;
	unsigned long timeStart;

	int countHighLow = sizeof(irDataInt) / sizeof(irDataInt[0]);
	for  ( int indexHighLow = 0; indexHighLow < countHighLow; indexHighLow++ ) {
		timeLength = irDataInt[indexHighLow]*100;
		timeStart = micros();
		do {
			digitalWrite(D3, 1 - (indexHighLow % 2));
			delayMicroseconds(8);
			digitalWrite(D3, 0);
			delayMicroseconds(7);
		} while(timeLength > micros() - timeStart);
	}
	return 0;
}

int irReceive(String command) {
  irData1 = "";
  irData2 = "";
	unsigned long time;
	unsigned long mill;
  static int state_prev = HIGH;
  static unsigned long microsTime_prev = 0;
  digitalWrite(D6, HIGH);
  time = millis() + 5000;
  Particle.publish("start",(String)time);
  int state;
  int flag = 0;
  int count = 0;
  while(1) {
    state = digitalRead(D2);
    if (state != state_prev ) {
      state_prev = state;
	    unsigned long microsTime = micros();
	    if (flag > 0) {
	      if (count<200) {
          irData1 = String(irData1+(String)((microsTime - microsTime_prev)/100));
          irData1 = String(irData1+",");
	      }
        else {
          irData2 = String(irData2+(String)((microsTime - microsTime_prev)/100));
	        irData2 = String(irData2+",");
	      }
	      count += 1;
	    }
    	microsTime_prev = microsTime;
    	flag = 1;
    }
    if (time < millis()) {
      break;
    }
  }
  Particle.variable("irData1",irData1);
  Particle.variable("irData2",irData2);
  digitalWrite(D6, LOW);
  return 0;
}

void PublishSensorInfo() {
  temperature = String((int)sensor.readTemperature() - 10);
  pressure = String(sensor.readPressure()/100.0);
  Particle.variable("temperature", temperature);
  Particle.variable("pressure", pressure);
}
