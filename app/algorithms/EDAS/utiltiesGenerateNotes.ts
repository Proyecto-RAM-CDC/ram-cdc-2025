import {
  typeEdasPropsNegative,
  typeEdasPropsPositive,
} from "~/algorithms/utilitiesTypes";

export function generateNotesEdasNegative(
  props: typeEdasPropsNegative
): string {
  let notes =
    "No requiere tratamiento antibiótico para los siguientes factores:\n";

  if (!props.hasDisenteria)
    notes += "- No sospecha de enfermedad por Shigella (disentería).\n";
  if (props.hasFiebre && !props.hasDolorAbdominal) {
    notes +=
      "- Hay hasFiebre mayor de 38℃ pero no hay dolor abdominal tipo cólico o tenesmo.\n";
  } else if (!props.hasFiebre && props.hasDolorAbdominal) {
    notes +=
      "- Hay dolor abdominal tipo cólico o tenesmo pero no hay hasFiebre.\n";
  } else {
    notes +=
      "- No hay hasFiebre mayor de 38℃ ni dolor abdominal tipo cólico o tenesmo.\n";
  }

  if (props.hasSangreHeces && props.hasDiarrea && props.evacuationCount < 3) {
    notes += `- Hay hasDiarrea y sangre en los heces, pero con solo ${props.evacuationCount} evacuaciones en las últimas 24 horas.\n`;
  }

  if (
    !props.hasSangreHeces &&
    props.hasDiarrea &&
    props.evacuationCount < 6 &&
    props.hasFiebre
  ) {
    notes += `- Hay hasDiarrea del viajero y hasFiebre mayor de 38℃, pero con solo ${props.evacuationCount} evacuaciones en las últimas 24 horas. Además no hay sangre en los heces.\n`;
  }

  if (
    !props.hasSangreHeces &&
    props.hasDiarrea &&
    props.evacuationCount < 6 &&
    !props.hasFiebre
  ) {
    notes += `- Hay hasDiarrea del viajero, pero con solo ${props.evacuationCount} evacuaciones en las últimas 24 horas. Además no hay sangre en los heces ni hasFiebre mayor de 38℃.\n`;
  }

  if (!props.hasSangreHeces && !props.hasDiarrea && props.hasFiebre) {
    notes +=
      "- Hay hasFiebre mayor de 38℃ solo, pero no hay hasDiarrea ni sangre en los heces.\n";
  }

  if (!props.hasSangreHeces && !props.hasDiarrea && !props.hasFiebre) {
    notes +=
      "- No hay hasFiebre mayor de 38℃, y no hay hasDiarrea ni sangre en los heces.\n";
  }

  if (!props.isImmunosuppressed) notes += "- No inmunocompromiso.\n";

  notes += "\nRecomendaciones adicionales:\n";
  notes +=
    "- Provea información a la persona y/o cuidador para identificar datos de alarma.\n";
  notes +=
    "- Asegúrese de dar recomendaciones para hidratación (vida suero oral).\n";
  notes += "- Recomendar paracetamol para controlar en caso de hasFiebre.\n";
  notes +=
    "- Recomendar regresar y revaluar si hasDiarrea continua después de 4 días.\n";

  notes += "\nDatos de alarma que requieren una gestión de segundo nivel:\n";
  if (props.isImmunosuppressed) notes += "- Inmunosupresión.\n";
  notes += "- No tolera la vía oral.\n";
  notes += "- Deshidratación grave.\n";
  notes += "- Datos de abdomen agudo.\n";
  notes += "- Septicemia.\n";
  notes +=
    "- La hasDiarrea y/o la hasFiebre continúan a pesar del tratamiento.\n";

  return notes;
}

export function generateNotesEdasPositive(
  props: typeEdasPropsPositive
): string {
  let notes =
    "Sí, requiere tratamiento antibiótico para los siguientes factores de riesgo:\n";
  if (props.hasDisenteria)
    notes += "- Sospecha de enfermedad por Shigella (disentería).\n";
  if (props.hasFiebre && props.hasDolorAbdominal)
    notes += "- Fiebre más dolor abdominal tipo cólico o tenesmo.\n";
  if (props.hasDiarrea && props.hasFiebre && props.evacuationCount > 6) {
    notes += `- Diarrea del viajero más hasFiebre mayor de 38℃ con ${props.evacuationCount} evacuaciones en las últimas 24 horas.\n`;
  }
  if (props.isImmunosuppressed) notes += "- Inmunocompromiso.\n";
  if (props.hasDiarrea && props.hasSangreHeces && props.evacuationCount > 3) {
    notes += `- Diarrea del viajero con sangre en los heces y ${props.evacuationCount} evacuaciones en las últimas 24 horas.\n`;
  }

  notes += "\nTratamiento antibiótico:\n";
  if (props.patientType === "Pediátrico") {
    notes += "- Ciprofloxacino 15 mg/kg dos veces al día por tres días.\n";
    notes +=
      "- Azitromicina 12 mg/kg en el día 1, después 6 mg/kg días 2 a 5.\n";
    notes +=
      "- Alternativo a 1ra y 2da elección: Trimetoprim sulfametoxazol.\n";
  } else if (props.patientType === "Adulto") {
    notes += "- Ciprofloxacino 500 mg dos veces al día por tres días.\n";
    notes += "- Azitromicina 500 mg una vez al día por cinco días.\n";
    notes +=
      "- Alternativo a 1ra y 2da elección: Trimetoprim sulfametoxazol 160/800 mg dos veces al día por cinco días.\n";
  } else if (props.patientType === "Adulto mayor") {
    notes += "- Ciprofloxacino 500 mg dos veces al día por tres días.\n";
    notes += "- Azitromicina 500 mg una vez al día por cinco días.\n";
    notes +=
      "- Alternativo a 1ra y 2da elección: Trimetoprim sulfametoxazol 160/800 mg dos veces al día por cinco días.\n";
  }

  notes += "\nRecomendaciones adicionales:\n";
  notes +=
    "- Asegúrese de dar recomendaciones para hidratación (vida suero oral).\n";
  notes += "- Recomendar paracetamol para controlar en caso de hasFiebre.\n";

  notes += "\nDatos de alarma que requieren una gestión de segundo nivel:\n";
  if (props.isImmunosuppressed) notes += "- Inmunosupresión.\n";
  notes += "- No tolera la vía oral.\n";
  notes += "- Deshidratación grave.\n";
  notes += "- Datos de abdomen agudo.\n";
  notes += "- Septicemia.\n";
  notes +=
    "- La hasDiarrea y/o la hasFiebre continúan a pesar del tratamiento.\n";

  return notes;
}
