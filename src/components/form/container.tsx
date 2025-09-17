import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

interface FormContainerProps {
  children?: React.ReactNode;
  title: string;
  description?: string;
}

export default function FormContainer(props: FormContainerProps) {
  return (
    <Card className="w-full max-w-2xl mx-auto shadow-none border-none">
      <CardHeader>
        <CardTitle>{props.title}</CardTitle>
        <CardDescription>{props.description}</CardDescription>
        <CardAction></CardAction>
      </CardHeader>
      <CardContent>{props.children}</CardContent>
    </Card>
  );
}
