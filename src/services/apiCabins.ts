import supabase, { supabaseUrl } from './supabase';

type Cabin = {
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: File;
};

export async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error(error);
    throw new Error('Error getting cabins');
  }

  return data;
}

export async function deleteCabin(id: number) {
  const { error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    throw new Error('Error deleting cabin');
  }
}

export async function createEditCabin(newCabin: Cabin, id) {
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll('/', '_');
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from('cabins');

  if (!id) {
    query.insert([{ ...newCabin, image: imagePath }]);
  } else {
    query.update({ ...newCabin, image: imagePath }).eq('id', id);
  }

  const { data, error } = await query.select().single();

  if (error) {
    throw new Error('Error inserting cabin');
  }

  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image);

  // delete the cabin if there was an error
  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data[0].id);
    console.error(storageError);
    throw new Error('Error uploading image. Cabin not created.');
  }
}
