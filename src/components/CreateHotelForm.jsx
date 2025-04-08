import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useCreateHotelMutation } from "@/lib/api";
import { Navigate, useNavigate } from "react-router";

const formSchema = z.object({
  name: z.string().min(1, { message: "Hotel name is required" }),
  location: z.string().min(1),
  image: z.string().min(1),
  price: z.number(),
  description: z.string().min(1),
  rating: z.union([z.number().int().positive().min(0).max(5), z.nan()]).optional(),
});

const CreateHotelForm = () => {


  const navigate = useNavigate();

  const [createHotel, { isLoading }] = useCreateHotelMutation();
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const handleSubmit2 = async (values) => {
    console.log("values - ", values);
    const { name, location, image, price, rating, description } = values; //obj deconstructing
    try {
    //   toast.loading("Creating hotel...");
      await createHotel({
        name,
        location,
        image,
        price,
        rating,
        description,
      }).unwrap();
      toast.success("Hotel created successfully");
      form.reset({
        name: "",
        location: "",
        image: "",
        price: 0,
        rating: 0,
        description: "",
      });
      navigate(`/hotels-manage`);
    } catch (error) {
      toast.error("Hotel creation failed");
    }
  };

  return (
    <Form {...form}>
      <form className="w-1/2" onSubmit={form.handleSubmit(handleSubmit2)}>
        <div className="grid gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hotel Name</FormLabel>
                <FormControl>
                  <Input placeholder="Hotel Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="Location" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <Input placeholder="Image" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Price"
                    onChange={(e) => {
                      field.onChange(parseFloat(e.target.value));
                    }}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hotel Current Rating</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Rating"
                    onChange={(e) => {
                      field.onChange(parseFloat(e.target.value));
                    }}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="mt-4">
          <Button type="submit">Create Hotel</Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateHotelForm;