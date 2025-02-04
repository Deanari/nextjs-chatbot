"use client";

import axios from "axios";
import * as z from "zod"; // shadcn forms
import { useForm } from "react-hook-form";
import { Chatbot } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
// import { ImageUpload } from "@/components/image-upload";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";
import { Wand2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface ChatbotFormProps {
    initialData: Chatbot | null;
}

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Name is required",
    }),
    description: z.string().min(1, {
        message: "Description is required",
    }),
    src: z.string().min(1, {
        message: "Image is required",
    }),
})

const ChatbotForm = ({ initialData }: ChatbotFormProps) => {
    const router = useRouter();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: "",
            description: "",
            src: "",
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            if (initialData) {
                // Update
                await axios.patch(`/api/chatbot/${initialData.id}`, values);
            } else {
                // Create
                await axios.post("/api/chatbot", values);
            }

            toast({
                description: "Success"
            });

            router.refresh();
            router.push("/");

        } catch (error) {
            toast({
                variant: "destructive",
                description: "something went wrong"
            });
            console.log(error)
        }
    }

    return (
        <div className="h-full p-4 space-y-2 max-w-3xl mx-auto">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-10">
                    <div className="space-y-2 w-full">
                        <div>
                            <h3 className="text-lg font-medium">
                                General Information
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                General information about your chatbot
                            </p>
                        </div>
                        <Separator className="bg-primary/10" />
                    </div>
                    {/* TODO bot card/ */}
                    <div>
                        <Avatar className="h-24 w-24">
                            <AvatarImage src={form.getValues().src || "/placeholder.svg"} />
                            <AvatarFallback>
                                loading...
                            </AvatarFallback>
                        </Avatar>
                        <div></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                            name="src"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem >
                                    <FormLabel>Image</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isLoading}
                                            placeholder="htts://...."
                                            {...field} // onchange onblur value and other shadcn props
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Your chatbot avatar image
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="name"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="col-span-2 md:col-span-1">
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isLoading}
                                            placeholder="Sam"
                                            {...field} // onchange onblur value and other shadcn props
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        This is how your chatbot will be named.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            name="description"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="col-span-2">
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            className="bg-background resize-none"
                                            rows={7}
                                            disabled={isLoading}
                                            placeholder="Virtual assistant"
                                            {...field} // onchange onblur value and other shadcn props
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Short description for your chatbot
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                    </div>

                    <div className="w-full flex justify-center">
                        <Button size="lg" disabled={isLoading}>
                            {initialData ? "Edit your chatbot" : "Create your chatbot"}
                            <Wand2 className="w-4 h-f ml-2" />
                        </Button>

                    </div>
                </form>
            </Form>
        </div>
    );
}

export default ChatbotForm;