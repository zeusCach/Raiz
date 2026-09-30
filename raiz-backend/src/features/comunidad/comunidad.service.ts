import { Comunidad } from "./comunidad.model";

export async function crearComunidad(
  creadorId: string,
  nombre: string,
  descripcion: string,
) {
  //creamos una comunidad asignando al usuario como creador y primer miembro
  return Comunidad.create({
    nombre,
    descripcion,
    creador: creadorId,
    miembros: [creadorId],
  });
}

export async function listarComunidades() {
  //buscamos todas las comunidades y las ordenamos de la más reciente a la más antigua
  return Comunidad.find()
    .sort({ createdAt: -1 })
    .select("nombre descripcion creador miembros createdAt");
}

export async function obtenerComunidad(id: string) {
  //buscamos la comunidad y obtenemos los datos básicos de sus miembros y creador
  const comunidad = await Comunidad.findById(id)
    .populate("miembros", "nombre fotoUrl")
    .populate("creador", "nombre");

  //si no existe la comunidad se rechaza la consulta
  if (!comunidad) {
    throw new Error("Comunidad no encontrada");
  }

  //devolvemos la comunidad encontrada
  return comunidad;
}

export async function unirseComunidad(id: string, userId: string) {
  //buscamos la comunidad a la que el usuario quiere unirse
  const comunidad = await Comunidad.findById(id);

  //si no existe la comunidad se rechaza la acción
  if (!comunidad) {
    throw new Error("Comunidad no encontrada");
  }

  //verificamos si el usuario ya pertenece a la comunidad
  const yaEsMiembro = comunidad.miembros.some((m) => m.toString() === userId);

  //si el usuario no es miembro lo agregamos a la comunidad
  if (!yaEsMiembro) {
    comunidad.miembros.push(userId as any);
    await comunidad.save();
  }

  //devolvemos la comunidad actualizada con sus miembros y creador
  return Comunidad.findById(id)
    .populate("miembros", "nombre fotoUrl")
    .populate("creador", "nombre");
}

export async function salirComunidad(id: string, userId: string) {
  //eliminamos al usuario de la lista de miembros y obtenemos la comunidad actualizada
  const comunidad = await Comunidad.findByIdAndUpdate(
    id,
    { $pull: { miembros: userId } },
    { new: true },
  )
    .populate("miembros", "nombre fotoUrl")
    .populate("creador", "nombre");

  //si no existe la comunidad se rechaza la acción
  if (!comunidad) {
    throw new Error("Comunidad no encontrada");
  }

  //devolvemos la comunidad actualizada
  return comunidad;
}
