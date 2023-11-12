import supabase, { supabaseUrl } from './supabase';

type Cabin = {
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: File | string | null;
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

export async function createEditCabin(newCabin: Cabin, id: number | null) {
  let hasImagePath = false;
  let imageName = '';

  // TODO: this logic looks a little off to me.
  /*
    We should handle...
    - new record: create with image, no image
    - existing: add image, remove image, change image

    I believe...
    - image being added will be a File
    - image not changing will be a string. 
    - image is null is either an an image being removed or a new record with no image
  */

  // do we have an image?
  if (newCabin.image) {
    // Next, check if image is a string and use startsWith
    if (typeof newCabin.image === 'string') {
      hasImagePath = newCabin.image.startsWith(supabaseUrl);
      imageName = `${Math.random()}-${newCabin.image}`.replaceAll('/', '_');
    } else if (newCabin.image instanceof File) {
      // Handle the case where image is a File
      imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll('/', '_');
    }
  }

  // TODO: should we change the image path
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query;

  if (!id) {
    query = supabase.from('cabins').insert([{ ...newCabin, image: imagePath }]);
  } else {
    query = supabase
      .from('cabins')
      .update({ ...newCabin, image: imagePath })
      .eq('id', id);
  }

  const { data, error } = await query.select().single();

  if (error) {
    throw new Error('Error inserting cabin');
  }

  // TODO: maybe don't upload an image if the image hasn't changed
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
