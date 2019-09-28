using System;
using System.Collections.Generic;
using System.Threading;
using WebSocketSharp;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace devmon_csharp
{
    class Program
    {
        static int eventsCount = 250;
        static int keyboardIndex = -1;

        static int ListDevices(List<Device> devices)
        {
            Console.WriteLine("Devices List");
            int i = 0;
            foreach(Device device in devices)
            {
                Console.WriteLine(device.unitId + " " + device.type + ": " + device.name);
                if (device.type == "keyboard")
                {
                    keyboardIndex = i;
                }
                i++;
            }
            return 0;
        }

        static int ShowSpyConfig(SpyConfig sp)
        {
            if (sp != null)
            {
                Console.WriteLine(sp.unitId + ": buttons:" + sp.spyButtons + ", keys:" + sp.spyKeys + ", pointer:" + sp.spyPointer
                                            + ", thumbWheel:" + sp.spyThumbWheel +", wheel:"+ sp.spyWheel);
            }
            return 0;
        }

        static int ListSpecialKeys(List<SpecialKey> specialKeys)
        {            
            if (specialKeys != null)
            {
                Console.WriteLine("\nSpecialKeys List");
                foreach (SpecialKey sk in specialKeys)
                {
                    Console.WriteLine(sk.unitId.ToString() + " " + sk.type.ToString() + ": ControllId:" + sk.controlId.ToString() + ", divert:" + sk.divert.ToString() 
                                                    + ", persist:" + sk.persist.ToString() + ", rawXY:" + sk.rawXY.ToString() + ", forcerawXY:" + sk.forcerawXY.ToString()
                                                    + ", fpos:" + sk.fpos.ToString() + ", fntog:" + sk.fntog.ToString());
                }
            }
            return 0;
        }

        static int ShowSpecialKey(SpecialKey sk)
        {           
            if (sk != null)
            {
                Console.WriteLine("\nSpecial key:" + sk.controlId);
                Console.WriteLine(sk.unitId + ": controlId: " + sk.controlId + ", divert:" + sk.divert + ", persist:" + sk.persist + ", rawXY:" + sk.rawXY + ", forcerawXY:" + sk.forcerawXY);
            }
            return 0;
        }

        static int ShowEvents(object payload, WebSocket ws)
        {            
            string jsonString = JsonConvert.SerializeObject(payload);
            Console.WriteLine(eventsCount + ": " + jsonString);
            
            int keyPressed = (int)JsonConvert.DeserializeObject<keyPressed>(jsonString).cid1;

            switch (keyPressed)
            {
                case 199:
                    Console.WriteLine("F1");
                    break;
                case 200:
                    Console.WriteLine("F2");
                    break;
                case 224:
                    Console.WriteLine("F3");
                    break;
                case 225:
                    Console.WriteLine("F4");
                    break;
                case 110:
                    Console.WriteLine("F5");
                    break;
            }

            eventsCount--;

            if (eventsCount < 1)
            {
                ws.Close();

                Console.WriteLine("Stop spying keyboard keys");
                SpyConfig spyconfig = new SpyConfig
                {
                    unitId = LogiDevMon.devices[0].unitId,
                    spyKeys = false
                };

                SpecialKey F1 = new SpecialKey
                {
                    unitId = LogiDevMon.devices[0].unitId,
                    controlId = 199,    //F1
                    divert = false,
                    persist = false
                };


                SpecialKey F2 = new SpecialKey
                {
                    unitId = LogiDevMon.devices[0].unitId,
                    controlId = 200,    //F2
                    divert = false
                };

                SpecialKey F3 = new SpecialKey
                {
                    unitId = LogiDevMon.devices[0].unitId,
                    controlId = 224,    //F3
                    divert = false
                };

                SpecialKey F4 = new SpecialKey
                {
                    unitId = LogiDevMon.devices[0].unitId,
                    controlId = 225,    //F4
                    divert = false
                };

                SpecialKey F5 = new SpecialKey
                {
                    unitId = LogiDevMon.devices[0].unitId,
                    controlId = 110,    //F5
                    divert = false
                };

                LogiDevMon.SetSpyConfig(spyconfig);
                LogiDevMon.SetSpecialKey(F1);
                LogiDevMon.SetSpecialKey(F2);
                LogiDevMon.SetSpecialKey(F3);
                LogiDevMon.SetSpecialKey(F4);
                LogiDevMon.SetSpecialKey(F5);
            }
            return 0;
        }

        static void Main(string[] args)
        {
            LogiDevMon.GetDevices(ListDevices);

            Thread.Sleep(1500);

            Console.WriteLine();

            if (LogiDevMon.devices.Count > 0 && keyboardIndex != -1)
            {           
                
                //Console.WriteLine("SpyConfig for: " + LogiDevMon.devices[keyboardIndex].name);
                //LogiDevMon.GetSpyConfig(LogiDevMon.devices[keyboardIndex].unitId, ShowSpyConfig);

                //Thread.Sleep(1000);

                //SpyConfig spyconfig = new SpyConfig
                //{
                //    unitId = LogiDevMon.devices[keyboardIndex].unitId,
                //    spyKeys = true
                //};

                //Console.WriteLine("\nSpy keyboard keys");
                //LogiDevMon.SetSpyConfig(spyconfig);
                //Thread.Sleep(1000);
                //LogiDevMon.GetSpyConfig(LogiDevMon.devices[keyboardIndex].unitId, ShowSpyConfig);
                //Thread.Sleep(1000);

                ////////////////////////////////////////////////////////////////////////////////////77

                //LogiDevMon.GetSpecialKeys(LogiDevMon.devices[keyboardIndex].unitId, ListSpecialKeys);
                //Thread.Sleep(2500);

                ////////////////////////////////////////////////////////////////////////////////////77

                SpecialKey F1 = new SpecialKey
                {
                    unitId = LogiDevMon.devices[0].unitId,
                    controlId = 199,    //F1
                    divert = true,
                    persist = true
                };

                SpecialKey F2 = new SpecialKey
                {
                    unitId = LogiDevMon.devices[0].unitId,
                    controlId = 200,    //F2
                    divert = true,
                    persist = true
                };

                SpecialKey F3 = new SpecialKey
                {
                    unitId = LogiDevMon.devices[0].unitId,
                    controlId = 224,    //F3
                    divert = true,
                    persist = true
                };

                SpecialKey F4 = new SpecialKey
                {
                    unitId = LogiDevMon.devices[0].unitId,
                    controlId = 225,    //F4
                    divert = true,
                    persist = true
                };

                SpecialKey F5 = new SpecialKey
                {
                    unitId = LogiDevMon.devices[0].unitId,
                    controlId = 110,    //F5
                    divert = true,
                    persist = true
                };

                LogiDevMon.SetSpecialKey(F1);                
                LogiDevMon.SetSpecialKey(F2);
                LogiDevMon.SetSpecialKey(F3);                
                LogiDevMon.SetSpecialKey(F4);
                LogiDevMon.SetSpecialKey(F5);
                
                Console.WriteLine("\nRead Key events");
                LogiDevMon.ReadEvents(ShowEvents);

            }
            else
            {
                Console.WriteLine("No keyboard detected, press any key to exit...");
            }

            Console.ReadKey(true);
        }
    }
}