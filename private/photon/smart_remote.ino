String irData="";
void setup() {
    // for particlu.function irReceive
    pinMode(D6, OUTPUT);
    // irDataPin
    pinMode(D2, INPUT);
    Particle.variable("irData",irData);
    Particle.function("irReceive", irReceive);
}


void loop() {

}

int irReceive(String command)
{
  unsigned long time;
  unsigned long mill;
  static int inputStatePrev = HIGH;
  static unsigned long microsPrev = 0;
  digitalWrite(D6, HIGH);
  time = millis() + 5000;
  int inputState;
  int flag = 0;
  while(1)
  {
      inputState = digitalRead(D2);
      if( inputState != inputStatePrev )
      {
       inputStatePrev = inputState;
       unsigned long micros = micros();
       if (flag > 0)
       {
        irData = String(irData+(String)(micros - microsPrev));
        irData = String(irData+", ");
       }
  	   microsPrev = micros;
  	   flag = 1;
      }
      if(time < millis())
      {
          break;
      }
  }
  Particle.variable("irData",irData);
  digitalWrite(D6, LOW);
  return 10;
}
