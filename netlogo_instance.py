from dependency import *

dirname = os.path.dirname(__file__)
netlogo = None

def get_netlogo_instance():
    global netlogo
    if netlogo is None:
        netlogo = pynetlogo.NetLogoLink(gui=False, jvm_path="/Library/Java/JavaVirtualMachines/jdk-19.jdk/Contents/MacOS/libjli.dylib")
        netlogo.load_model(os.path.join(dirname, "FEWCalc_Export_Test.nlogo"))
        # netlogo.command("setup")
    return netlogo

