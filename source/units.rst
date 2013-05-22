Unit protocol
=============

Authors: Andrew Berkeley, Rufus Pollock (Open Knowledge Foundation), James Smith (Open Data Institute)

:**Version**: 0.1
:**Last Updated**: 22 May 2013
:**Created**: 05 May 2013


This document provides a proposal for a standardized way of describing units associated with numeric quantities.

The protocol is intended to:

* Be simple
* Be machine readable
* Follow exising formats and implmentations where possible

In addressing these goals, the protocol primarily provides the following:

* An inventory of standardised units with unique identifiers.
* A standardized syntax for describing compound units

This is a draft specification and still under development. If you have comments or suggestions please file them in the issue tracker at: https://github.com/dataprotocols/dataprotocols/issues. If you have explicit changes please fork the repo (https://github.com/dataprotocols/dataprotocols) and submit a pull request.


Specification
=============

* A unit description must be specified as a string containing references to 1 or more of the valid units defined in this protocol (see below). 

* Unit identifiers can be prefixed using valid unit prefixes.

* Where a compound unit (a unit comprising more than 1 base unit) is described, unit identifiers must be combined according to the compound unit syntax defined herein.


Examples
========
=============== ====================================================================
unit            description
=============== ====================================================================
"m"             metre
"kW h           kilowatt hour
"kg m^2 s^-2"   implied joule
"kg m^2/s^2"    implied joule (alternative denominator delimiter)
"J"             joule
"btu_39f/lb"    British thermal units per pound
"btu_39f lb^-1" British thermal units per pound (alternative denominator delimiter)
"t km"          metric tonne kilometre
"ton_uk km"     imperial ton kilometre
"ton_us km"     imperial ton kilometre
"deg_c/h"       degrees celsius per hour
"deg_c h^-1"    degrees celsius per hour (alternative denominator delimiter)
"GBP/USD"       exchange rate
=============== ====================================================================

Compound unit syntax
====================

Compound units represent the result of combining units via multiplication, division and raising to powers.

* Unit multiplication is indicated using a single character of white-space, e.g.::

        "kW h"             #=> a kilowatt hour

* Unit powers are indicated using the caret character followed by a positive or negative integer with no white-space, e.g.::

        "m^2"              #=> a square metre
        
        "m^3"              #=> a cubic metre
        
        "s^-1"             #=> frequency per second
    
* Unit division - i.e. denominator units - can be specified in two ways:
  
  * using a forward-slash character to delimit all numerator units from denoninator units, e.g.::

            "m/s"              #=> metres per second
            
            "kg m^2/s^2"       #=> joule
            
            "kg/t km"          #=> kilograms per tonne kilometre

  * using a negative power on individual units::

            "m s^-1"           #=> metres per second
            
            "kg m^2 s^-2"      #=> joule
            
            "kg t^-1 km^-1"    #=> kilograms per tonne kilometre

* Base units within compound units can be ordered in any way. The only constraint on unit ordering is where a single "/" is used to delimit numerator from denominator. In this case, all denominator units must follow the delimiter and all numerator units must precede it, although the order of units within the numerator and denominators is arbitrary.

* Only a single "/" is permitted in any unit description.


Valid units
===========

Accepted units together with their unique identifers and other descriptive information are listed below.

In many cases the unique identifier ("UID") for each unit is simply the internationally recognised unit symbol (e.g. m, kg, K, J, Pa, etc.). Exceptions to this include cases where exotic characters are used (e.g. "°") or where variants of identically named units exist (e.g. US and UK versions of the gallon, ton, barrel)). 

These units and their proposed UIDs follow the implementation found in the Quantify Rubygem library (link below), which in-turn follows (and extends) the specifications the JScience library (links below).

Note: UIDs are case sensitive, owing to their conformance in the majority of cases to standard unit descriptors.

============== ===================================== =========== ============================= ====================================================
UID            name                                  symbol      physical quantity             dimensions
============== ===================================== =========== ============================= ====================================================
η              amagat                                η           number density                length^-3 x item
Bq             bequerel                              Bq          radioactivity                 time^-1
C              coloumb                               C           electric charge               time x electric_current
F              farad                                 F           electrical capacitance        length^-2 x mass^-1 x time^4 x electric_current^2
Gy             gray                                  Gy          radiation absorbed dose       length^2 x time^-2
Hz             hertz                                 Hz          frequency                     time^-1
H              henry                                 H           inductance                    length^2 x mass x time^-2 x electric_current^-2
kat            katal                                 kat         catalytic activity            time^-1 x amount_of_substance
lm             luman                                 lm          luminous flux                 luminous_intensity
lx             lux                                   lx          illuminance                   length^-2 x luminous_intensity
Ohm            ohm                                   Ω           electric resistance           length^2 x mass x time^-3 x electric_current^-2
S              siemens                               S           electric conductance          length^-2 x mass^-1 x time^3 x electric_current^2
Sv             sievert                               Sv          radiation dose equivalent     length^2 x time^-2
T              tesla                                 T           magnetic flux density         mass x time^-2 x electric_current^-1
Wb             weber                                 Wb          magnetic flux                 length^2 x mass x time^-2 x electric_current^-1
m^2            square metre                          m^2         area                          length^2
m^3            cubic metre                           m^3         volume                        length^3
m/s            metre per second                      m/s         velocity                      length x time^-1
m/s^2          metre per square second               m/s^2       acceleration                  length x time^-2
cm^-1          per centimetre                        cm^-1       length^-1
cm/s^2         centimetre per square second          cm/s^2      acceleration                  length x time^-2
A              ampere                                A           electric current              electric_current
bit            bit                                   bit         information                   information
cd             candela                               cd          luminous intensity            luminous_intensity
K              kelvin                                K           temperature                   temperature
m              metre                                 m           length                        length
mol            mole                                  mol         amount of substance           amount_of_substance
s              second                                s           time                          time
kg             kilogram                              kg          mass                          mass
g              gram                                  g           mass                          mass
km             kilometre                             km          length                        length
μm             micron                                μm          length                        length
J              joule                                 J           energy                        length^2 x mass x time^-2
N              newton                                N           force                         length x mass x time^-2
W              watt                                  W           power                         length^2 x mass x time^-3
V              volt                                  V           electric potential difference length^2 x mass x time^-3 x electric_current^-1
Pa             pascal                                Pa          pressure                      length^-1 x mass x time^-2
acre           acre                                  acre        area                          length^2
a              are                                   a           area                          length^2
atm            atmosphere                            atm         pressure                      length^-1 x mass x time^-2
bar            bar                                   bar         pressure                      length^-1 x mass x time^-2
b              barn                                  b           area                          length^2
bhp            boiler horsepower                     bhp         power                         length^2 x mass x time^-3
btu_39f        british thermal unit (39 °F)          BTU         energy                        length^2 x mass x time^-2
btu_60f        british thermal unit (60 °F)          BTU         energy                        length^2 x mass x time^-2
btu_63f        british thermal unit (63 °F)          BTU         energy                        length^2 x mass x time^-2
btu_iso        british thermal unit (ISO)            BTU         energy                        length^2 x mass x time^-2
btu_it         british thermal unit (IT)             BTU         energy                        length^2 x mass x time^-2
btu_mean       british thermal unit (mean)           BTU         energy                        length^2 x mass x time^-2
btu_thermo     british thermal unit (thermochemical) BTU         energy                        length^2 x mass x time^-2
btu_59f        british thermal unit (59 °F)          BTU         energy                        length^2 x mass x time^-2
bu_imp         US bushel                             bu (Imp)    volume                        length^3
bu_us          UK bushel                             bu (US lvl) volume                        length^3
cal            calorie                               cal         energy                        length^2 x mass x time^-2
cp             candle power                          cp          luminous flux                 luminous_intensity
CHU            celsius heat unit                     CHU         energy                        length^2 x mass x time^-2
cmHg           centimetre of mercury                 cmHg        pressure                      length^-1 x mass x time^-2
cmH2O          centimetre of water                   cmH2O       pressure                      length^-1 x mass x time^-2
clo            clo                                   clo         thermal resistance            mass^-1 x time^3 x temperature
c_us           cup                                   c (US)      volume                        length^3
Ci             curie                                 Ci          radioactivity                 time^-1
dyn            dyne                                  dyn         force                         length x mass x time^-2
dyn_cm         dyne centimetre                       dyn cm      energy                        length^2 x mass x time^-2
hp_elec        electric horsepower                   hp          power                         length^2 x mass x time^-3
eV             electron volt                         eV          energy                        length^2 x mass x time^-2
erg            erg                                   erg         energy                        length^2 x mass x time^-2
Fd             faraday                               F           electric charge               time x electric_current
fc             footcandle                            fc          illuminance                   length^-2 x luminous_intensity
ftH2O          foot of water                         ftH2O       pressure                      length^-1 x mass x time^-2
Fr             franklin                              Fr          electric charge               time x electric_current
γ              gamma                                 γ           magnetic flux density         mass x time^-2 x electric_current^-1
gauss          gauss                                 G           magnetic flux density         mass x time^-2 x electric_current^-1
Eh             hartree                               Eh          energy                        length^2 x mass x time^-2
ha             hectare                               ha          area                          length^2
hhd            hogshead                              hhd         volume                        length^3
inHg           inch of mercury                       inHg        pressure                      length^-1 x mass x time^-2
inH2O          inch of water                         inH2O       pressure                      length^-1 x mass x time^-2
kcal           kilocalorie                           kcal        energy                        length^2 x mass x time^-2
kgf            kilogram force                        kgf         force                         length x mass x time^-2
kn             knot                                  kn          velocity                      length x time^-1
La             lambert                               La          illuminance                   length^-2 x luminous_intensity
L              litre                                 L           volume                        length^3
Mx             maxwell                               Mx          magnetic flux                 length^2 x mass x time^-2 x electric_current^-1
hp             metric horsepower                     hp          power                         length^2 x mass x time^-3
mbar           millibar                              mbar        pressure                      length^-1 x mass x time^-2
mmHg           millimetre of mercury                 mmHg        pressure                      length^-1 x mass x time^-2
bbl            petroleum barrel                      bbl         volume                        length^3
p              poncelot                              p           power                         length^2 x mass x time^-3
pdl            poundal                               pdl         force                         length x mass x time^-2
lbf            pound force                           lbf         force                         length x mass x time^-2
quad           quad                                  quad        energy                        length^2 x mass x time^-2
rd             rad                                   rad         radiation absorbed dose       length^2 x time^-2
rem            rem                                   rem         radiation dose equivalent     length^2 x time^-2
reyn           reyn                                  reyn        dynamic viscosity             length^-1 x mass x time^-1
rood           rood                                  rood        area                          length^2
Rd             rutherford                            rd          radioactivity                 time^-1
Ry             rydberg                               Ry          energy                        length^2 x mass x time^-2
sn             sthene                                sn          force                         length x mass x time^-2
St             stoke                                 St          kinematic viscosity           length^2 x time^-1
thm            therm                                 thm         energy                        length^2 x mass x time^-2
th             thermie                               th          energy                        length^2 x mass x time^-2
tog            tog                                   tog         thermal resistance            mass^-1 x time^3 x temperature
bbl_imp        UK barrel                             bl (Imp)    volume                        length^3
oz_fl_uk       UK fluid ounce                        fl oz       volume                        length^3
gal_uk         UK gallon                             gal         volume                        length^3
gi_uk          UK gill                               gi          volume                        length^3
hp_uk          UK horsepower                         hp          power                         length^2 x mass x time^-3
gal_dry_us     US dry gallon                         gal         volume                        length^3
bbl_dry_us     US dry barrel                         bl (US)     volume                        length^3
oz_fl          US fluid ounce                        fl oz       volume                        length^3
gi_us          US gill                               gi          volume                        length^3
bbl_fl_us      US liquid barrel                      fl bl (US)  volume                        length^3
gal            US liquid gallon                      gal         volume                        length^3
kWh            kilowatt hour                         kWh         energy                        length^2 x mass x time^-2
lbf/in^2       pound force per square inch           psi         pressure                      length^-1 x mass x time^-2
angstrom       angstrom                              Å           length                        length
ua             astronomical unit                     AU          length                        length
Bi             biot                                  Bi          electric current              electric_current
byte           byte                                  byte        information                   information
kt             carat                                 kt          mass                          mass
ch             chain                                 ch          length                        length
d              day                                   d           time                          time
deg_c          degree celsius                        °C          temperature                   temperature
deg_f          degree farenheit                      °F          temperature                   temperature
deg_r          degree rankine                        °R          temperature                   temperature
dram           dram                                  dram        length                        length
me             electron mass                         me          mass                          mass
ell            ell                                   ell         length                        length
ftm            fathom                                ftm         length                        length
fm             fermi                                 fm          length                        length
ft             foot                                  ft          length                        length
fur            furlong                               fur         length                        length
gr             grain                                 gr          mass                          mass
h              hour                                  h           time                          time
cwt_long       hundredweight long                    cwt         mass                          mass
cwt_short      hundredweight short                   cwt         mass                          mass
in             inch                                  in          length                        length
ly             light year                            ly          length                        length
ln             line                                  ln          length                        length
lnk            link                                  lnk         length                        length
ton_uk         long ton                              ton         mass                          mass
mi             mile                                  mi          length                        length
min            minute                                min         time                          time
month          month                                 month       time                          time
nl             nautical league                       nl          length                        length
nmi            nautical mile                         nmi         length                        length
oz             ounce                                 oz          mass                          mass
pc             parsec                                pc          length                        length
dwt            pennyweight                           dwt         mass                          mass
pt             point                                 pt          length                        length
lb             pound                                 lb          mass                          mass
lbmol          pound mole                            lbmol       amount of substance           amount_of_substance
ton_us         short ton                             ton         mass                          mass
d_sid          sidereal day                          d           time                          time
year_sid       sidereal year                         yr          time                          time
lea            statute league                        lea         length                        length
st             stone                                 st          mass                          mass
t              tonne                                 t           mass                          mass
u              unified atomic mass                   u           mass                          mass
foot_survey_us US survey foot                        ft          length                        length
week           week                                  wk          time                          time
yd             yard                                  yd          length                        length
year           year                                  yr          time                          time
unity                                                            dimensionless                 
percent        percent                               %           dimensionless                 
rad            radian                                rad         plane angle                   
sr             steridian                             sr          solid angle                   
centiradian    centiradian                           crad        plane angle                   
arc_min        arcminute                             ′           plane angle                   
arc_sec        arcsecond                             ″           plane angle                   
degree         degree                                °           plane angle                   
grad           grad                                  grad        plane angle                   
rev            revolution                            rev         plane angle                   
sphere         sphere                                sphere      solid angle   
============== ===================================== =========== ============================= ====================================================


Valid unit prefixes
===================

============== ===================================== =========== ===================
UID            name                                  symbol      factor
============== ===================================== =========== ===================
da             deca                                  da          10.0                          
h              hecto                                 h           100.0                         
k              kilo                                  k           1000.0                        
M              mega                                  M           1000000.0                     
G              giga                                  G           1000000000.0                  
T              tera                                  T           1000000000000.0               
P              peta                                  P           1000000000000000.0            
E              exa                                   E           1.0e+18                       
Z              zetta                                 Z           1.0e+21                       
Y              yotta                                 Y           1.0e+24                       
d              deci                                  d           0.1                           
c              centi                                 c           0.01                          
m              milli                                 m           0.001                         
μ              micro                                 μ           1.0e-06                       
n              nano                                  n           1.0e-09                       
p              pico                                  p           1.0e-12                       
f              femto                                 f           1.0e-15                       
a              atto                                  a           1.0e-18                       
z              zepto                                 z           1.0e-21                       
y              yocto                                 y           1.0e-24 
============== ===================================== =========== ===================


Appendix
========

### Related work
----------------

* Quantify Rubygem (https://github.com/spatchcock/quantify)
* JScience SI (http://jscience.org/api/javax/measure/unit/SI.html)
* JScience Non-SI (http://jscience.org/api/javax/measure/unit/NonSI.html)
