// "use client";

// import { useState, useEffect } from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Controller, useForm } from "react-hook-form";
// import { toast } from "sonner";
// import * as z from "zod";

// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Field,
//   FieldDescription,
//   FieldError,
//   FieldGroup,
//   FieldLabel,
// } from "@/components/ui/field";
// import { Input } from "@/components/ui/input";
// import { useDebounceCallback } from "usehooks-ts";
// import { authClient } from "@/lib/auth-client";

// const credentialSchema = z.object({
//   name: z.string().min(5).max(20),
//   username: z
//     .string()
//     .min(8, { message: "Username must be atleast 8 characters long" })
//     .max(20, { message: "Username must not be longer than 20 characters." }),
//   email: z.email(),
//   password: z
//     .string()
//     .min(8, { message: "Password must be atleast 8 characters long" })
//     .max(20, { message: "Password must not be longer than 20 characters." }),
// });

// export default function SignUp() {
//   const [username, setUsername] = useState("");
//   const debounced = useDebounceCallback(setUsername, 2000);

//   const form = useForm<z.infer<typeof credentialSchema>>({
//     resolver: zodResolver(credentialSchema),
//     defaultValues: {
//       name: "",
//       username: "",
//       email: "",
//       password: "",
//     },
//   });

//   const { setError, clearErrors } = form;

//   useEffect(() => {
//     usernameExists();
//   }, [username]);

//   async function usernameExists() {
//     const { data: response, error } = await authClient.isUsernameAvailable({
//       username, // required
//     });
//     if (response?.available) {
//       clearErrors("username");
//       console.log(
//         "Such username doesn't exist in database, you can use this username",
//       );
//     } else {
//       console.log("Username is not available for you, as it is already taken");
//       setError("username", {
//         type: "manual",
//         message: error?.message || "Username already taken",
//       });
//     }
//   }

//   // function onSubmit(data: z.infer<typeof credentialSchema>) {
//   //   toast("You submitted the following values:", {
//   //     description: (
//   //       <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
//   //         <code>{JSON.stringify(data, null, 2)}</code>
//   //       </pre>
//   //     ),
//   //     position: "bottom-right",
//   //     classNames: {
//   //       content: "flex flex-col gap-2",
//   //     },
//   //     style: {
//   //       "--border-radius": "calc(var(--radius)  + 4px)",
//   //     } as React.CSSProperties,
//   //   });
//   // }

//   async function onSubmit(values: z.infer<typeof credentialSchema>) {
//     await authClient.signUp.email(
//       {
//         name: values.name,
//         username: values.username,
//         email: values.email,
//         password: values.password,
//         callbackURL: "/",
//       },
//       {
//         onRequest: () => {
//           toast("Requesting...", {
//             description: "Wait a little",
//             action: {
//               label: "Undo",
//               onClick: () => console.log("Undo"),
//             },
//           });
//         },
//         onSuccess: () => {
//           toast("User registered, but unverifed", {
//             description: "Have a good day.",
//             action: {
//               label: "Undo",
//               onClick: () => console.log("Undo"),
//             },
//           });
//         },
//         onError: (ctx) => {
//           console.log("error", ctx);
//           toast("Something went wrong while signup...", {
//             description: "Try again",
//             action: {
//               label: "Undo",
//               onClick: () => console.log("Undo"),
//             },
//           });
//         },
//       },
//     );
//   }

//   return (
//     <Card className="w-full sm:max-w-md">
//       <CardHeader>
//         <CardTitle>Welcome to Anonymous Message</CardTitle>
//         <CardDescription>Send messages anonymously...</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
//           <FieldGroup>
//             <Controller
//               name="name"
//               control={form.control}
//               render={({ field, fieldState }) => (
//                 <Field data-invalid={fieldState.invalid}>
//                   <FieldLabel htmlFor="form-rhf-demo-name">
//                     Full Name
//                   </FieldLabel>
//                   <Input
//                     {...field}
//                     id="form-rhf-demo-name"
//                     aria-invalid={fieldState.invalid}
//                     placeholder="Bruce Wayne"
//                     autoComplete="off"
//                   />
//                   {fieldState.invalid && (
//                     <FieldError errors={[fieldState.error]} />
//                   )}
//                 </Field>
//               )}
//             />

//             {/* Username Input  */}

//             <Controller
//               name="username"
//               control={form.control}
//               render={({ field, fieldState }) => (
//                 <Field data-invalid={fieldState.invalid}>
//                   <FieldLabel htmlFor="form-rhf-demo-username">
//                     Username
//                   </FieldLabel>
//                   <Input
//                     {...field}
//                     onChange={(e) => {
//                       field.onChange(e.target.value);
//                       debounced(e.target.value);
//                     }}
//                     id="form-rhf-demo-username"
//                     aria-invalid={fieldState.invalid}
//                     placeholder="bruce_wayne08"
//                     autoComplete="off"
//                   />
//                   {fieldState.invalid && (
//                     <FieldError errors={[fieldState.error]} />
//                   )}
//                 </Field>
//               )}
//             />

//             {/* Email Input  */}
//             <Controller
//               name="email"
//               control={form.control}
//               render={({ field, fieldState }) => (
//                 <Field data-invalid={fieldState.invalid}>
//                   <FieldLabel htmlFor="form-rhf-demo-email">
//                     Email ID
//                   </FieldLabel>
//                   <Input
//                     {...field}
//                     id="form-rhf-demo-email"
//                     aria-invalid={fieldState.invalid}
//                     placeholder="brucewayne07@gmail.com"
//                     autoComplete="off"
//                   />
//                   {fieldState.invalid && (
//                     <FieldError errors={[fieldState.error]} />
//                   )}
//                 </Field>
//               )}
//             />
//             {/* Password  Input*/}
//             <Controller
//               name="password"
//               control={form.control}
//               render={({ field, fieldState }) => (
//                 <Field data-invalid={fieldState.invalid}>
//                   <FieldLabel htmlFor="form-rhf-demo-password">
//                     Password
//                   </FieldLabel>
//                   <Input
//                     {...field}
//                     id="form-rhf-demo-password"
//                     aria-invalid={fieldState.invalid}
//                     placeholder="iambatman"
//                     autoComplete="off"
//                   />
//                   {fieldState.invalid && (
//                     <FieldError errors={[fieldState.error]} />
//                   )}
//                 </Field>
//               )}
//             />
//           </FieldGroup>
//         </form>
//       </CardContent>
//       <CardFooter>
//         <Field orientation="horizontal">
//           <Button type="button" variant="outline" onClick={() => form.reset()}>
//             Reset
//           </Button>
//           <Button type="submit" form="form-rhf-demo">
//             Submit
//           </Button>
//         </Field>
//       </CardFooter>
//     </Card>
//   );
// }
