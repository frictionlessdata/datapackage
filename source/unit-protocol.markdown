# Unit protocol

Authors: Andrew Berkeley, Rufus Pollock (Open Knowledge Foundation), James Smith (Open Data Institute)

<table>
  <tr>
    <td>**Version**</td>
    <td>0.1</td>
  </tr>
  <tr>
    <td>**Last Updated**</td>
    <td>05 May 2013</td>
  </tr>
  <tr>
    <td>**Created**</td>
    <td>05 May 2013</td>
  </tr>
</table>

## <a name="abstract"></a>Abstract

This document provides a proposal for a standardized way of describing units associated with numeric quantities.

The protocol is intended to:

* Be simple
* Be machine readable
* Follow exising formats and implmentations where possible

In addressing these goals, the protocol primarily provides the following:

* An inventory of standardised units with unique identifiers.
* A standardized syntax for describing compound units

    This is a draft specification and still under development. If you have
    comments or suggestions please file them in the issue tracker at:
    https://github.com/dataprotocols/dataprotocols/issues. If you have explicit changes
    please fork the repo (https://github.com/dataprotocols/dataprotocols) and submit a
    pull request.


## <a name="specification"></a>Specification

* A unit description must be specified as a string containing references to 1 or more of the [unique unit identifiers](#valid_units) defined in this protocol (see below). 

* Unit identifiers can be prefixed using [standardised prefix identifiers](#valid_unit_prefixes).

* Where a compound unit (a unit comprising more than 1 base unit) is described, unit identifiers must be combined according to the [syntax](#compound_unit_syntax) defined herein.


### <a name="examples"></a>Examples

<table>
  <tr>
    <td>"m"</td>
    <td>metre</td>
  </tr>
  <tr>
    <td>"kW h"</td>
    <td>kilowatt hour</td>
  </tr>
  <tr>
    <td>"kg m^2 s^-2"</td>
    <td>implied joule </td>
  </tr>
  <tr>
    <td>"kg m^2/s^2"</td>
    <td>implied joule (alternative denominator delimiter)</td>
  </tr>
  <tr>
    <td>"J"</td>
    <td>joule</td>
  </tr>
  <tr>
    <td>"btu_39f/lb"</td>
    <td>British thermal units per pound</td>
  </tr>
  <tr>
    <td>"btu_39f lb^-1"</td>
    <td>British thermal units per pound (alternative denominator delimiter)</td>
  </tr>
  <tr>
    <td>"t km"</td>
    <td>metric tonne kilometre</td>
  </tr>
  <tr>
    <td>"ton_uk km"</td>
    <td>imperial ton kilometre</td>
  </tr>
  <tr>
    <td>"ton_us km"</td>
    <td>imperial ton kilometre</td>
  </tr>
  <tr>
    <td>"deg_c/h"</td>
    <td>degrees celsius per hour</td>
  </tr>
  <tr>
    <td>"deg_c h^-1"</td>
    <td>degrees celsius per hour (alternative denominator delimiter)</td>
  </tr>
  <tr>
    <td>"GBP/USD"</td>
    <td>exchange rate</td>
  </tr>
</table>

### <a name="compound_unit_syntax"></a>Compound unit syntax

Compound units represent the result of combining units via multiplication, division and raising to powers.

* Unit multiplication is indicated using a single character of white-space, e.g.: 

    "kW h"             #=> a kilowatt hour

* Unit powers are indicated using the caret character followed by a positive or negative integer with no white-space, e.g.:

    "m^2"              #=> a square metre
    "m^3"              #=> a cubic metre
    "s^-1"             #=> frequency per second
    
* Unit division - i.e. denominator units - can be specified in two ways:
* ** using a forward-slash character to delimit all numerator units from denoninator units, e.g.

    "m/s"              #=> metres per second
    "kg m^2/s^2"       #=> joule
    "kg/t km"          #=> kilograms per tonne kilometre

* ** using a negative power on individual units

    "m s^-1"           #=> metres per second
    "kg m^2 s^-2"      #=> joule
    "kg t^-1 km^-1"    #=> kilograms per tonne kilometre

* Base units within compound units can be ordered in any way. The only constraint on unit ordering is where a single "/" is used to delimit numerator from denominator. In this case, all denominator units must follow the delimiter and all numerator units must precede it, although the order of units within the numerator and denominators is arbitrary.

* Only a single "/" is permitted in any unit description.

### <a name="valid_units"></a>Valid units

Accepted units together with their unique identifers and other descriptive information are listed below.

In many cases the unique identifier ("UID") for each unit is simply the internationally recognised unit symbol (e.g. m, kg, K, J, Pa, etc.). Exceptions to this include cases where exotic characters are used (e.g. "°") or where variants of identically named units exist (e.g. US and UK versions of the gallon, ton, barrel)). These units and their proposed UIDs follow the implementation found in the [Quantify Rubygem library](#appendix), which in-turn follows (and extends) the specifications the [JScience library](#appendix).

Note: UIDs are case sensitive, owing to their conformance in the majority of cases to standard units descriptors.

<table>
  <tr>
    <td>UID</td>
    <td>Name</td>
    <td>Symbol</td>
    <td>Physical quantity</td>
    <td>Dimensions</td>
    <td>Description</td>
  </tr>
  <tr>
    <td>η</td>
    <td>amagat</td>
    <td>η</td>
    <td>number density</td>
    <td>length^-3 x item</td>
    <td></td>
  </tr>
  <tr>
    <td>Bq</td>
    <td>bequerel</td>
    <td>Bq</td>
    <td>radioactivity</td>
    <td>time^-1</td>
    <td></td>
  </tr>
  <tr>
    <td>C</td>
    <td>coloumb</td>
    <td>C</td>
    <td>electric charge</td>
    <td>time x electric_current</td>
    <td></td>
  </tr>
  <tr>
    <td>F</td>
    <td>farad</td>
    <td>F</td>
    <td>electrical capacitance</td>
    <td>length^-2 x mass^-1 x time^4 x electric_current^2</td>
    <td></td>
  </tr>
  <tr>
    <td>Gy</td>
    <td>gray</td>
    <td>Gy</td>
    <td>radiation absorbed dose</td>
    <td>length^2 x time^-2</td>
    <td></td>
  </tr>
  <tr>
    <td>Hz</td>
    <td>hertz</td>
    <td>Hz</td>
    <td>frequency</td>
    <td>time^-1</td>
    <td></td>
  </tr>
  <tr>
    <td>H</td>
    <td>henry</td>
    <td>H</td>
    <td>inductance</td>
    <td>length^2 x mass x time^-2 x electric_current^-2</td>
    <td></td>
  </tr>
  <tr>
    <td>kat</td>
    <td>katal</td>
    <td>kat</td>
    <td>catalytic activity</td>
    <td>time^-1 x amount_of_substance</td>
    <td></td>
  </tr>
  <tr>
    <td>lm</td>
    <td>luman</td>
    <td>lm</td>
    <td>luminous flux</td>
    <td>luminous_intensity</td>
    <td></td>
  </tr>
  <tr>
    <td>lx</td>
    <td>lux</td>
    <td>lx</td>
    <td>illuminance</td>
    <td>length^-2 x luminous_intensity</td>
    <td></td>
  </tr>
  <tr>
    <td>Ohm</td>
    <td>ohm</td>
    <td>Ω</td>
    <td>electric resistance</td>
    <td>length^2 x mass x time^-3 x electric_current^-2</td>
    <td></td>
  </tr>
  <tr>
    <td>S</td>
    <td>siemens</td>
    <td>S</td>
    <td>electric conductance</td>
    <td>length^-2 x mass^-1 x time^3 x electric_current^2</td>
    <td></td>
  </tr>
  <tr>
    <td>Sv</td>
    <td>sievert</td>
    <td>Sv</td>
    <td>radiation dose equivalent</td>
    <td>length^2 x time^-2</td>
    <td></td>
  </tr>
  <tr>
    <td>T</td>
    <td>tesla</td>
    <td>T</td>
    <td>magnetic flux density</td>
    <td>mass x time^-2 x electric_current^-1</td>
    <td></td>
  </tr>
  <tr>
    <td>Wb</td>
    <td>weber</td>
    <td>Wb</td>
    <td>magnetic flux</td>
    <td>length^2 x mass x time^-2 x electric_current^-1</td>
    <td></td>
  </tr>
  <tr>
    <td>m^2</td>
    <td>square metre</td>
    <td>m^2</td>
    <td>area</td>
    <td>length^2</td>
    <td></td>
  </tr>
  <tr>
    <td>m^3</td>
    <td>cubic metre</td>
    <td>m^3</td>
    <td>volume</td>
    <td>length^3</td>
    <td></td>
  </tr>
  <tr>
    <td>m/s</td>
    <td>metre per second</td>
    <td>m/s</td>
    <td>velocity</td>
    <td>length x time^-1</td>
    <td></td>
  </tr>
  <tr>
    <td>m/s^2</td>
    <td>metre per square second</td>
    <td>m/s^2</td>
    <td>acceleration</td>
    <td>length x time^-2</td>
    <td></td>
  </tr>
  <tr>
    <td>cm^-1</td>
    <td>per centimetre</td>
    <td>cm^-1</td>
    <td></td>
    <td>length^-1</td>
    <td></td>
  </tr>
  <tr>
    <td>cm/s^2</td>
    <td>centimetre per square second</td>
    <td>cm/s^2</td>
    <td>acceleration</td>
    <td>length x time^-2</td>
    <td></td>
  </tr>
  <tr>
    <td>A</td>
    <td>ampere</td>
    <td>A</td>
    <td>electric current</td>
    <td>electric_current</td>
    <td></td>
  </tr>
  <tr>
    <td>bit</td>
    <td>bit</td>
    <td>bit</td>
    <td>information</td>
    <td>information</td>
    <td></td>
  </tr>
  <tr>
    <td>cd</td>
    <td>candela</td>
    <td>cd</td>
    <td>luminous intensity</td>
    <td>luminous_intensity</td>
    <td></td>
  </tr>
  <tr>
    <td>K</td>
    <td>kelvin</td>
    <td>K</td>
    <td>temperature</td>
    <td>temperature</td>
    <td></td>
  </tr>
  <tr>
    <td>m</td>
    <td>metre</td>
    <td>m</td>
    <td>length</td>
    <td>length</td>
    <td></td>
  </tr>
  <tr>
    <td>mol</td>
    <td>mole</td>
    <td>mol</td>
    <td>amount of substance</td>
    <td>amount_of_substance</td>
    <td></td>
  </tr>
  <tr>
    <td>s</td>
    <td>second</td>
    <td>s</td>
    <td>time</td>
    <td>time</td>
    <td></td>
  </tr>
  <tr>
    <td>kg</td>
    <td>kilogram</td>
    <td>kg</td>
    <td>mass</td>
    <td>mass</td>
    <td></td>
  </tr>
  <tr>
    <td>g</td>
    <td>gram</td>
    <td>g</td>
    <td>mass</td>
    <td>mass</td>
    <td></td>
  </tr>
  <tr>
    <td>km</td>
    <td>kilometre</td>
    <td>km</td>
    <td>length</td>
    <td>length</td>
    <td></td>
  </tr>
  <tr>
    <td>μm</td>
    <td>micron</td>
    <td>μm</td>
    <td>length</td>
    <td>length</td>
    <td></td>
  </tr>
  <tr>
    <td>J</td>
    <td>joule</td>
    <td>J</td>
    <td>energy</td>
    <td>length^2 x mass x time^-2</td>
    <td></td>
  </tr>
  <tr>
    <td>N</td>
    <td>newton</td>
    <td>N</td>
    <td>force</td>
    <td>length x mass x time^-2</td>
    <td></td>
  </tr>
  <tr>
    <td>W</td>
    <td>watt</td>
    <td>W</td>
    <td>power</td>
    <td>length^2 x mass x time^-3</td>
    <td></td>
  </tr>
  <tr>
    <td>V</td>
    <td>volt</td>
    <td>V</td>
    <td>electric potential difference</td>
    <td>length^2 x mass x time^-3 x electric_current^-1</td>
    <td></td>
  </tr>
  <tr>
    <td>Pa</td>
    <td>pascal</td>
    <td>Pa</td>
    <td>pressure</td>
    <td>length^-1 x mass x time^-2</td>
    <td></td>
  </tr>
  <tr>
    <td>acre</td>
    <td>acre</td>
    <td>acre</td>
    <td>area</td>
    <td>length^2</td>
    <td></td>
  </tr>
  <tr>
    <td>a</td>
    <td>are</td>
    <td>a</td>
    <td>area</td>
    <td>length^2</td>
    <td></td>
  </tr>
  <tr>
    <td>atm</td>
    <td>atmosphere</td>
    <td>atm</td>
    <td>pressure</td>
    <td>length^-1 x mass x time^-2</td>
    <td></td>
  </tr>
  <tr>
    <td>bar</td>
    <td>bar</td>
    <td>bar</td>
    <td>pressure</td>
    <td>length^-1 x mass x time^-2</td>
    <td></td>
  </tr>
  <tr>
    <td>b</td>
    <td>barn</td>
    <td>b</td>
    <td>area</td>
    <td>length^2</td>
    <td></td>
  </tr>
  <tr>
    <td>bhp</td>
    <td>boiler horsepower</td>
    <td>bhp</td>
    <td>power</td>
    <td>length^2 x mass x time^-3</td>
    <td></td>
  </tr>
  <tr>
    <td>btu_39f</td>
    <td>british thermal unit (39 °F)</td>
    <td>BTU</td>
    <td>energy</td>
    <td>length^2 x mass x time^-2</td>
    <td></td>
  </tr>
  <tr>
    <td>btu_60f</td>
    <td>british thermal unit (60 °F)</td>
    <td>BTU</td>
    <td>energy</td>
    <td>length^2 x mass x time^-2</td>
    <td></td>
  </tr>
  <tr>
    <td>btu_63f</td>
    <td>british thermal unit (63 °F)</td>
    <td>BTU</td>
    <td>energy</td>
    <td>length^2 x mass x time^-2</td>
    <td></td>
  </tr>
  <tr>
    <td>btu_iso</td>
    <td>british thermal unit (ISO)</td>
    <td>BTU</td>
    <td>energy</td>
    <td>length^2 x mass x time^-2</td>
    <td></td>
  </tr>
  <tr>
    <td>btu_it</td>
    <td>british thermal unit (IT)</td>
    <td>BTU</td>
    <td>energy</td>
    <td>length^2 x mass x time^-2</td>
    <td></td>
  </tr>
  <tr>
    <td>btu_mean</td>
    <td>british thermal unit (mean)</td>
    <td>BTU</td>
    <td>energy</td>
    <td>length^2 x mass x time^-2</td>
    <td></td>
  </tr>
  <tr>
    <td>btu_thermo</td>
    <td>british thermal unit (thermochemical)</td>
    <td>BTU</td>
    <td>energy</td>
    <td>length^2 x mass x time^-2</td>
    <td></td>
  </tr>
  <tr>
    <td>btu_59f</td>
    <td>british thermal unit (59 °F)</td>
    <td>BTU</td>
    <td>energy</td>
    <td>length^2 x mass x time^-2</td>
    <td></td>
  </tr>
  <tr>
    <td>bu_imp</td>
    <td>US bushel</td>
    <td>bu (Imp)</td>
    <td>volume</td>
    <td>length^3</td>
    <td></td>
  </tr>
  <tr>
    <td>bu_us</td>
    <td>UK bushel</td>
    <td>bu (US lvl)</td>
    <td>volume</td>
    <td>length^3</td>
    <td></td>
  </tr>
  <tr>
    <td>cal</td>
    <td>calorie</td>
    <td>cal</td>
    <td>energy</td>
    <td>length^2 x mass x time^-2</td>
    <td></td>
  </tr>
  <tr>
    <td>cp</td>
    <td>candle power</td>
    <td>cp</td>
    <td>luminous flux</td>
    <td>luminous_intensity</td>
    <td></td>
  </tr>
  <tr>
    <td>CHU</td>
    <td>celsius heat unit</td>
    <td>CHU</td>
    <td>energy</td>
    <td>length^2 x mass x time^-2</td>
    <td></td>
  </tr>
  <tr>
    <td>cmHg</td>
    <td>centimetre of mercury</td>
    <td>cmHg</td>
    <td>pressure</td>
    <td>length^-1 x mass x time^-2</td>
    <td></td>
  </tr>
  <tr>
    <td>cmH2O</td>
    <td>centimetre of water</td>
    <td>cmH2O</td>
    <td>pressure</td>
    <td>length^-1 x mass x time^-2</td>
    <td></td>
  </tr>
  <tr>
    <td>clo</td>
    <td>clo</td>
    <td>clo</td>
    <td>thermal resistance</td>
    <td>mass^-1 x time^3 x temperature</td>
    <td></td>
  </tr>
  <tr>
    <td>c_us</td>
    <td>cup</td>
    <td>c (US)</td>
    <td>volume</td>
    <td>length^3</td>
    <td></td>
  </tr>
  <tr>
    <td>Ci</td>
    <td>curie</td>
    <td>Ci</td>
    <td>radioactivity</td>
    <td>time^-1</td>
    <td></td>
  </tr>
  <tr>
    <td>dyn</td>
    <td>dyne</td>
    <td>dyn</td>
    <td>force</td>
    <td>length x mass x time^-2</td>
    <td></td>
  </tr>
  <tr>
    <td>dyn_cm</td>
    <td>dyne centimetre</td>
    <td>dyn cm</td>
    <td>energy</td>
    <td>length^2 x mass x time^-2</td>
    <td></td>
  </tr>
  <tr>
    <td>hp_elec</td>
    <td>electric horsepower</td>
    <td>hp</td>
    <td>power</td>
    <td>length^2 x mass x time^-3</td>
    <td></td>
  </tr>
  <tr>
    <td>eV</td>
    <td>electron volt</td>
    <td>eV</td>
    <td>energy</td>
    <td>length^2 x mass x time^-2</td>
    <td></td>
  </tr>
  <tr>
    <td>erg</td>
    <td>erg</td>
    <td>erg</td>
    <td>energy</td>
    <td>length^2 x mass x time^-2</td>
    <td></td>
  </tr>
  <tr>
    <td>Fd</td>
    <td>faraday</td>
    <td>F</td>
    <td>electric charge</td>
    <td>time x electric_current</td>
    <td></td>
  </tr>
  <tr>
    <td>fc</td>
    <td>footcandle</td>
    <td>fc</td>
    <td>illuminance</td>
    <td>length^-2 x luminous_intensity</td>
    <td></td>
  </tr>
  <tr>
    <td>ftH2O</td>
    <td>foot of water</td>
    <td>ftH2O</td>
    <td>pressure</td>
    <td>length^-1 x mass x time^-2</td>
    <td></td>
  </tr>
  <tr>
    <td>Fr</td>
    <td>franklin</td>
    <td>Fr</td>
    <td>electric charge</td>
    <td>time x electric_current</td>
    <td></td>
  </tr>
  <tr>
    <td>γ</td>
    <td>gamma</td>
    <td>γ</td>
    <td>magnetic flux density</td>
    <td>mass x time^-2 x electric_current^-1</td>
    <td></td>
  </tr>
  <tr>
    <td>gauss</td>
    <td>gauss</td>
    <td>G</td>
    <td>magnetic flux density</td>
    <td>mass x time^-2 x electric_current^-1</td>
    <td></td>
  </tr>
  <tr>
    <td>Eh</td>
    <td>hartree</td>
    <td>Eh</td>
    <td>energy</td>
    <td>length^2 x mass x time^-2</td>
    <td></td>
  </tr>
  <tr>
    <td>ha</td>
    <td>hectare</td>
    <td>ha</td>
    <td>area</td>
    <td>length^2</td>
    <td></td>
  </tr>
  <tr>
    <td>hhd</td>
    <td>hogshead</td>
    <td>hhd</td>
    <td>volume</td>
    <td>length^3</td>
    <td></td>
  </tr>
  <tr>
    <td>inHg</td>
    <td>inch of mercury</td>
    <td>inHg</td>
    <td>pressure</td>
    <td>length^-1 x mass x time^-2</td>
    <td></td>
  </tr>
  <tr>
    <td>inH2O</td>
    <td>inch of water</td>
    <td>inH2O</td>
    <td>pressure</td>
    <td>length^-1 x mass x time^-2</td>
    <td></td>
  </tr>
  <tr>
    <td>kcal</td>
    <td>kilocalorie</td>
    <td>kcal</td>
    <td>energy</td>
    <td>length^2 x mass x time^-2</td>
    <td></td>
  </tr>
  <tr>
    <td>kgf</td>
    <td>kilogram force</td>
    <td>kgf</td>
    <td>force</td>
    <td>length x mass x time^-2</td>
    <td></td>
  </tr>
  <tr>
    <td>kn</td>
    <td>knot</td>
    <td>kn</td>
    <td>velocity</td>
    <td>length x time^-1</td>
    <td></td>
  </tr>
  <tr>
    <td>La</td>
    <td>lambert</td>
    <td>La</td>
    <td>illuminance</td>
    <td>length^-2 x luminous_intensity</td>
    <td></td>
  </tr>
  <tr>
    <td>L</td>
    <td>litre</td>
    <td>L</td>
    <td>volume</td>
    <td>length^3</td>
    <td></td>
  </tr>
  <tr>
    <td>Mx</td>
    <td>maxwell</td>
    <td>Mx</td>
    <td>magnetic flux</td>
    <td>length^2 x mass x time^-2 x electric_current^-1</td>
    <td></td>
  </tr>
  <tr>
    <td>hp</td>
    <td>metric horsepower</td>
    <td>hp</td>
    <td>power</td>
    <td>length^2 x mass x time^-3</td>
    <td></td>
  </tr>
  <tr>
    <td>mbar</td>
    <td>millibar</td>
    <td>mbar</td>
    <td>pressure</td>
    <td>length^-1 x mass x time^-2</td>
    <td></td>
  </tr>
  <tr>
    <td>mmHg</td>
    <td>millimetre of mercury</td>
    <td>mmHg</td>
    <td>pressure</td>
    <td>length^-1 x mass x time^-2</td>
    <td></td>
  </tr>
  <tr>
    <td>bbl</td>
    <td>petroleum barrel</td>
    <td>bbl</td>
    <td>volume</td>
    <td>length^3</td>
    <td></td>
  </tr>
  <tr>
    <td>p</td>
    <td>poncelot</td>
    <td>p</td>
    <td>power</td>
    <td>length^2 x mass x time^-3</td>
    <td></td>
  </tr>
  <tr>
    <td>pdl</td>
    <td>poundal</td>
    <td>pdl</td>
    <td>force</td>
    <td>length x mass x time^-2</td>
    <td></td>
  </tr>
  <tr>
    <td>lbf</td>
    <td>pound force</td>
    <td>lbf</td>
    <td>force</td>
    <td>length x mass x time^-2</td>
    <td></td>
  </tr>
  <tr>
    <td>quad</td>
    <td>quad</td>
    <td>quad</td>
    <td>energy</td>
    <td>length^2 x mass x time^-2</td>
    <td></td>
  </tr>
  <tr>
    <td>rd</td>
    <td>rad</td>
    <td>rad</td>
    <td>radiation absorbed dose</td>
    <td>length^2 x time^-2</td>
    <td></td>
  </tr>
  <tr>
    <td>rem</td>
    <td>rem</td>
    <td>rem</td>
    <td>radiation dose equivalent</td>
    <td>length^2 x time^-2</td>
    <td></td>
  </tr>
  <tr>
    <td>reyn</td>
    <td>reyn</td>
    <td>reyn</td>
    <td>dynamic viscosity</td>
    <td>length^-1 x mass x time^-1</td>
    <td></td>
  </tr>
  <tr>
    <td>rood</td>
    <td>rood</td>
    <td>rood</td>
    <td>area</td>
    <td>length^2</td>
    <td></td>
  </tr>
  <tr>
    <td>Rd</td>
    <td>rutherford</td>
    <td>rd</td>
    <td>radioactivity</td>
    <td>time^-1</td>
    <td></td>
  </tr>
  <tr>
    <td>Ry</td>
    <td>rydberg</td>
    <td>Ry</td>
    <td>energy</td>
    <td>length^2 x mass x time^-2</td>
    <td></td>
  </tr>
  <tr>
    <td>sn</td>
    <td>sthene</td>
    <td>sn</td>
    <td>force</td>
    <td>length x mass x time^-2</td>
    <td></td>
  </tr>
  <tr>
    <td>St</td>
    <td>stoke</td>
    <td>St</td>
    <td>kinematic viscosity</td>
    <td>length^2 x time^-1</td>
    <td></td>
  </tr>
  <tr>
    <td>thm</td>
    <td>therm</td>
    <td>thm</td>
    <td>energy</td>
    <td>length^2 x mass x time^-2</td>
    <td></td>
  </tr>
  <tr>
    <td>th</td>
    <td>thermie</td>
    <td>th</td>
    <td>energy</td>
    <td>length^2 x mass x time^-2</td>
    <td></td>
  </tr>
  <tr>
    <td>tog</td>
    <td>tog</td>
    <td>tog</td>
    <td>thermal resistance</td>
    <td>mass^-1 x time^3 x temperature</td>
    <td></td>
  </tr>
  <tr>
    <td>bbl_imp</td>
    <td>UK barrel</td>
    <td>bl (Imp)</td>
    <td>volume</td>
    <td>length^3</td>
    <td></td>
  </tr>
  <tr>
    <td>oz_fl_uk</td>
    <td>UK fluid ounce</td>
    <td>fl oz</td>
    <td>volume</td>
    <td>length^3</td>
    <td></td>
  </tr>
  <tr>
    <td>gal_uk</td>
    <td>UK gallon</td>
    <td>gal</td>
    <td>volume</td>
    <td>length^3</td>
    <td></td>
  </tr>
  <tr>
    <td>gi_uk</td>
    <td>UK gill</td>
    <td>gi</td>
    <td>volume</td>
    <td>length^3</td>
    <td></td>
  </tr>
  <tr>
    <td>hp_uk</td>
    <td>UK horsepower</td>
    <td>hp</td>
    <td>power</td>
    <td>length^2 x mass x time^-3</td>
    <td></td>
  </tr>
  <tr>
    <td>gal_dry_us</td>
    <td>US dry gallon</td>
    <td>gal</td>
    <td>volume</td>
    <td>length^3</td>
    <td></td>
  </tr>
  <tr>
    <td>bbl_dry_us</td>
    <td>US dry barrel</td>
    <td>bl (US)</td>
    <td>volume</td>
    <td>length^3</td>
    <td></td>
  </tr>
  <tr>
    <td>oz_fl</td>
    <td>US fluid ounce</td>
    <td>fl oz</td>
    <td>volume</td>
    <td>length^3</td>
    <td></td>
  </tr>
  <tr>
    <td>gi_us</td>
    <td>US gill</td>
    <td>gi</td>
    <td>volume</td>
    <td>length^3</td>
    <td></td>
  </tr>
  <tr>
    <td>bbl_fl_us</td>
    <td>US liquid barrel</td>
    <td>fl bl (US)</td>
    <td>volume</td>
    <td>length^3</td>
    <td></td>
  </tr>
  <tr>
    <td>gal</td>
    <td>US liquid gallon</td>
    <td>gal</td>
    <td>volume</td>
    <td>length^3</td>
    <td></td>
  </tr>
  <tr>
    <td>kWh</td>
    <td>kilowatt hour</td>
    <td>kWh</td>
    <td>energy</td>
    <td>length^2 x mass x time^-2</td>
    <td></td>
  </tr>
  <tr>
    <td>lbf/in^2</td>
    <td>pound force per square inch</td>
    <td>psi</td>
    <td>pressure</td>
    <td>length^-1 x mass x time^-2</td>
    <td></td>
  </tr>
  <tr>
    <td>angstrom</td>
    <td>angstrom</td>
    <td>Å</td>
    <td>length</td>
    <td>length</td>
    <td></td>
  </tr>
  <tr>
    <td>ua</td>
    <td>astronomical unit</td>
    <td>AU</td>
    <td>length</td>
    <td>length</td>
    <td></td>
  </tr>
  <tr>
    <td>Bi</td>
    <td>biot</td>
    <td>Bi</td>
    <td>electric current</td>
    <td>electric_current</td>
    <td></td>
  </tr>
  <tr>
    <td>byte</td>
    <td>byte</td>
    <td>byte</td>
    <td>information</td>
    <td>information</td>
    <td></td>
  </tr>
  <tr>
    <td>kt</td>
    <td>carat</td>
    <td>kt</td>
    <td>mass</td>
    <td>mass</td>
    <td></td>
  </tr>
  <tr>
    <td>ch</td>
    <td>chain</td>
    <td>ch</td>
    <td>length</td>
    <td>length</td>
    <td></td>
  </tr>
  <tr>
    <td>d</td>
    <td>day</td>
    <td>d</td>
    <td>time</td>
    <td>time</td>
    <td></td>
  </tr>
  <tr>
    <td>deg_c</td>
    <td>degree celsius</td>
    <td>°C</td>
    <td>temperature</td>
    <td>temperature</td>
    <td></td>
  </tr>
  <tr>
    <td>deg_f</td>
    <td>degree farenheit</td>
    <td>°F</td>
    <td>temperature</td>
    <td>temperature</td>
    <td></td>
  </tr>
  <tr>
    <td>deg_r</td>
    <td>degree rankine</td>
    <td>°R</td>
    <td>temperature</td>
    <td>temperature</td>
    <td></td>
  </tr>
  <tr>
    <td>dram</td>
    <td>dram</td>
    <td>dram</td>
    <td>length</td>
    <td>length</td>
    <td></td>
  </tr>
  <tr>
    <td>me</td>
    <td>electron mass</td>
    <td>me</td>
    <td>mass</td>
    <td>mass</td>
    <td></td>
  </tr>
  <tr>
    <td>ell</td>
    <td>ell</td>
    <td>ell</td>
    <td>length</td>
    <td>length</td>
    <td></td>
  </tr>
  <tr>
    <td>ftm</td>
    <td>fathom</td>
    <td>ftm</td>
    <td>length</td>
    <td>length</td>
    <td></td>
  </tr>
  <tr>
    <td>fm</td>
    <td>fermi</td>
    <td>fm</td>
    <td>length</td>
    <td>length</td>
    <td></td>
  </tr>
  <tr>
    <td>ft</td>
    <td>foot</td>
    <td>ft</td>
    <td>length</td>
    <td>length</td>
    <td></td>
  </tr>
  <tr>
    <td>fur</td>
    <td>furlong</td>
    <td>fur</td>
    <td>length</td>
    <td>length</td>
    <td></td>
  </tr>
  <tr>
    <td>gr</td>
    <td>grain</td>
    <td>gr</td>
    <td>mass</td>
    <td>mass</td>
    <td></td>
  </tr>
  <tr>
    <td>h</td>
    <td>hour</td>
    <td>h</td>
    <td>time</td>
    <td>time</td>
    <td></td>
  </tr>
  <tr>
    <td>cwt_long</td>
    <td>hundredweight long</td>
    <td>cwt</td>
    <td>mass</td>
    <td>mass</td>
    <td></td>
  </tr>
  <tr>
    <td>cwt_short</td>
    <td>hundredweight short</td>
    <td>cwt</td>
    <td>mass</td>
    <td>mass</td>
    <td></td>
  </tr>
  <tr>
    <td>in</td>
    <td>inch</td>
    <td>in</td>
    <td>length</td>
    <td>length</td>
    <td></td>
  </tr>
  <tr>
    <td>ly</td>
    <td>light year</td>
    <td>ly</td>
    <td>length</td>
    <td>length</td>
    <td></td>
  </tr>
  <tr>
    <td>ln</td>
    <td>line</td>
    <td>ln</td>
    <td>length</td>
    <td>length</td>
    <td></td>
  </tr>
  <tr>
    <td>lnk</td>
    <td>link</td>
    <td>lnk</td>
    <td>length</td>
    <td>length</td>
    <td></td>
  </tr>
  <tr>
    <td>ton_uk</td>
    <td>long ton</td>
    <td>ton</td>
    <td>mass</td>
    <td>mass</td>
    <td></td>
  </tr>
  <tr>
    <td>mi</td>
    <td>mile</td>
    <td>mi</td>
    <td>length</td>
    <td>length</td>
    <td></td>
  </tr>
  <tr>
    <td>min</td>
    <td>minute</td>
    <td>min</td>
    <td>time</td>
    <td>time</td>
    <td></td>
  </tr>
  <tr>
    <td>month</td>
    <td>month</td>
    <td>month</td>
    <td>time</td>
    <td>time</td>
    <td></td>
  </tr>
  <tr>
    <td>nl</td>
    <td>nautical league</td>
    <td>nl</td>
    <td>length</td>
    <td>length</td>
    <td></td>
  </tr>
  <tr>
    <td>nmi</td>
    <td>nautical mile</td>
    <td>nmi</td>
    <td>length</td>
    <td>length</td>
    <td></td>
  </tr>
  <tr>
    <td>oz</td>
    <td>ounce</td>
    <td>oz</td>
    <td>mass</td>
    <td>mass</td>
    <td></td>
  </tr>
  <tr>
    <td>pc</td>
    <td>parsec</td>
    <td>pc</td>
    <td>length</td>
    <td>length</td>
    <td></td>
  </tr>
  <tr>
    <td>dwt</td>
    <td>pennyweight</td>
    <td>dwt</td>
    <td>mass</td>
    <td>mass</td>
    <td></td>
  </tr>
  <tr>
    <td>pt</td>
    <td>point</td>
    <td>pt</td>
    <td>length</td>
    <td>length</td>
    <td></td>
  </tr>
  <tr>
    <td>lb</td>
    <td>pound</td>
    <td>lb</td>
    <td>mass</td>
    <td>mass</td>
    <td></td>
  </tr>
  <tr>
    <td>lbmol</td>
    <td>pound mole</td>
    <td>lbmol</td>
    <td>amount of substance</td>
    <td>amount_of_substance</td>
    <td></td>
  </tr>
  <tr>
    <td>ton_us</td>
    <td>short ton</td>
    <td>ton</td>
    <td>mass</td>
    <td>mass</td>
    <td></td>
  </tr>
  <tr>
    <td>d_sid</td>
    <td>sidereal day</td>
    <td>d</td>
    <td>time</td>
    <td>time</td>
    <td></td>
  </tr>
  <tr>
    <td>year_sid</td>
    <td>sidereal year</td>
    <td>yr</td>
    <td>time</td>
    <td>time</td>
    <td></td>
  </tr>
  <tr>
    <td>lea</td>
    <td>statute league</td>
    <td>lea</td>
    <td>length</td>
    <td>length</td>
    <td></td>
  </tr>
  <tr>
    <td>st</td>
    <td>stone</td>
    <td>st</td>
    <td>mass</td>
    <td>mass</td>
    <td></td>
  </tr>
  <tr>
    <td>t</td>
    <td>tonne</td>
    <td>t</td>
    <td>mass</td>
    <td>mass</td>
    <td></td>
  </tr>
  <tr>
    <td>u</td>
    <td>unified atomic mass</td>
    <td>u</td>
    <td>mass</td>
    <td>mass</td>
    <td></td>
  </tr>
  <tr>
    <td>foot_survey_us</td>
    <td>US survey foot</td>
    <td>ft</td>
    <td>length</td>
    <td>length</td>
    <td></td>
  </tr>
  <tr>
    <td>week</td>
    <td>week</td>
    <td>wk</td>
    <td>time</td>
    <td>time</td>
    <td></td>
  </tr>
  <tr>
    <td>yd</td>
    <td>yard</td>
    <td>yd</td>
    <td>length</td>
    <td>length</td>
    <td></td>
  </tr>
  <tr>
    <td>year</td>
    <td>year</td>
    <td>yr</td>
    <td>time</td>
    <td>time</td>
    <td></td>
  </tr>
  <tr>
    <td>unity</td>
    <td></td>
    <td></td>
    <td>dimensionless</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>percent</td>
    <td>percent</td>
    <td>%</td>
    <td>dimensionless</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>rad</td>
    <td>radian</td>
    <td>rad</td>
    <td>plane angle</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>sr</td>
    <td>steridian</td>
    <td>sr</td>
    <td>solid angle</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>centiradian</td>
    <td>centiradian</td>
    <td>crad</td>
    <td>plane angle</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>arc_min</td>
    <td>arcminute</td>
    <td>′</td>
    <td>plane angle</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>arc_sec</td>
    <td>arcsecond</td>
    <td>″</td>
    <td>plane angle</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>degree</td>
    <td>degree</td>
    <td>°</td>
    <td>plane angle</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>grad</td>
    <td>grad</td>
    <td>grad</td>
    <td>plane angle</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>rev</td>
    <td>revolution</td>
    <td>rev</td>
    <td>plane angle</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>sphere</td>
    <td>sphere</td>
    <td>sphere</td>
    <td>solid angle</td>
    <td></td>
    <td></td>
  </tr>
</table>

### <a name="valid_unit_prefixes"></a>Valid unit prefixes


<table>
  <tr>
    <td>da</td>
    <td>deca</td>
    <td>da</td>
    <td>10.0</td>
    <td></td>
  </tr>
  <tr>
    <td>h</td>
    <td>hecto</td>
    <td>h</td>
    <td>100.0</td>
    <td></td>
  </tr>
  <tr>
    <td>k</td>
    <td>kilo</td>
    <td>k</td>
    <td>1000.0</td>
    <td></td>
  </tr>
  <tr>
    <td>M</td>
    <td>mega</td>
    <td>M</td>
    <td>1000000.0</td>
    <td></td>
  </tr>
  <tr>
    <td>G</td>
    <td>giga</td>
    <td>G</td>
    <td>1000000000.0</td>
    <td></td>
  </tr>
  <tr>
    <td>T</td>
    <td>tera</td>
    <td>T</td>
    <td>1000000000000.0</td>
    <td></td>
  </tr>
  <tr>
    <td>P</td>
    <td>peta</td>
    <td>P</td>
    <td>1000000000000000.0</td>
    <td></td>
  </tr>
  <tr>
    <td>E</td>
    <td>exa</td>
    <td>E</td>
    <td>1.0e+18</td>
    <td></td>
  </tr>
  <tr>
    <td>Z</td>
    <td>zetta</td>
    <td>Z</td>
    <td>1.0e+21</td>
    <td></td>
  </tr>
  <tr>
    <td>Y</td>
    <td>yotta</td>
    <td>Y</td>
    <td>1.0e+24</td>
    <td></td>
  </tr>
  <tr>
    <td>d</td>
    <td>deci</td>
    <td>d</td>
    <td>0.1</td>
    <td></td>
  </tr>
  <tr>
    <td>c</td>
    <td>centi</td>
    <td>c</td>
    <td>0.01</td>
    <td></td>
  </tr>
  <tr>
    <td>m</td>
    <td>milli</td>
    <td>m</td>
    <td>0.001</td>
    <td></td>
  </tr>
  <tr>
    <td>μ</td>
    <td>micro</td>
    <td>μ</td>
    <td>1.0e-06</td>
    <td></td>
  </tr>
  <tr>
    <td>n</td>
    <td>nano</td>
    <td>n</td>
    <td>1.0e-09</td>
    <td></td>
  </tr>
  <tr>
    <td>p</td>
    <td>pico</td>
    <td>p</td>
    <td>1.0e-12</td>
    <td></td>
  </tr>
  <tr>
    <td>f</td>
    <td>femto</td>
    <td>f</td>
    <td>1.0e-15</td>
    <td></td>
  </tr>
  <tr>
    <td>a</td>
    <td>atto</td>
    <td>a</td>
    <td>1.0e-18</td>
    <td></td>
  </tr>
  <tr>
    <td>z</td>
    <td>zepto</td>
    <td>z</td>
    <td>1.0e-21</td>
    <td></td>
  </tr>
  <tr>
    <td>y</td>
    <td>yocto</td>
    <td>y</td>
    <td>1.0e-24</td>
    <td></td>
  </tr>
</table>

## <a name="appendix"></a>Appendix

### Related work

* [Quantify Rubygem](https://github.com/spatchcock/quantify)
* [JScience SI](http://jscience.org/api/javax/measure/unit/SI.html)
* [JScience Non-SI](http://jscience.org/api/javax/measure/unit/NonSI.html)