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
    static int s_iState_prev = HIGH;
    static unsigned long s_ulMicros_prev = 0;
    digitalWrite(D6, HIGH);
    time = millis() + 5000;
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
	        irData = String(irData+", ");
	       }
    	   s_ulMicros_prev = ulMicros;
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
