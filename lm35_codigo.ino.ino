int lm35_pin = A0, leitura_lm35 = 0;
float temperatura;

void setup()
{
Serial.begin(9600);
}

void loop(){

leitura_lm35 = analogRead(lm35_pin);
temperatura = leitura_lm35 * (5.0/1023) * 100;
float temperaturaproc1 = (temperatura * 0.136) + 8.94;
float temperaturaproc2 = (temperatura * 0.0907) + 45.960;
float temperaturaproc3 = (temperatura*0.226)+64.9;
float temperaturaproc4 = (temperatura*0.68)+59.7;
float temperaturaproc5 = (temperatura*0.635208711433756)+47.7205081669692;
float temperaturaproc6 = (temperatura*0.226860254083485)+1.90018148820327;
float temperaturaproc7 = (temperatura*0.226860254083485)+6.90018148820327;
float temperaturaproc8 =  (temperatura*0.0907441016333938)+1.96007259528131;
float temperaturaproc9 = (temperatura*0.0907441016333941)+97.9600725952813;
float temperaturaproc10 = (temperatura*0.226860254083485)+29.9001814882033;
float temperaturaproc11 = (temperatura*0.680580762250453)+39.7005444646098;
float temperaturaproc12 = (temperatura*0.226860254083484)+56.9001814882033;
float temperaturaproc13 = (temperatura*0.0907441016333938)+-2.03992740471869;
float temperaturaproc14 = (temperatura*0.453720508166969)+49.8003629764065;
float temperaturaproc15 = (temperatura*0.226860254083485)+-3.09981851179673;


Serial.print(temperaturaproc1);
Serial.print (";");
Serial.print(temperaturaproc2);
Serial.print (";");
Serial.print(temperaturaproc3);
Serial.print (";");
Serial.print(temperaturaproc4);
Serial.print (";");
Serial.print(temperaturaproc5);
Serial.print (";");
Serial.print(temperaturaproc6);
Serial.print (";");
Serial.print(temperaturaproc7);
Serial.print (";");
Serial.print(temperaturaproc8);
Serial.print (";");
Serial.print(temperaturaproc9);
Serial.print (";");
Serial.print(temperaturaproc10);
Serial.print (";");
Serial.print(temperaturaproc11);
Serial.print (";");
Serial.print(temperaturaproc12);
Serial.print (";");
Serial.print(temperaturaproc13);
Serial.print (";");
Serial.print(temperaturaproc14);
Serial.print (";");
Serial.println(temperaturaproc15);


delay(2000);
}