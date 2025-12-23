/** biome-ignore-all lint/performance/noImgElement: "AI Elements is framework agnostic" */
"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  ImageIcon,
  Loader2Icon,
  PaperclipIcon,
  PlusIcon,
  SendIcon,
  SquareIcon,
  XIcon,
} from "lucide-react";
import { nanoid } from "nanoid";
import {
  Children,
  createContext,
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type HTMLAttributes,
  type ChangeEvent,
  type FormEvent,
  type KeyboardEvent,
  type ClipboardEvent,
} from "react";

type Attachment = {
  id: string;
  type: "file";
  url?: string;
  mediaType?: string;
  filename?: string;
};

type AttachmentsContextValue = {
  files: Attachment[];
  add: (files: File[] | FileList) => void;
  remove: (id: string) => void;
  clear: () => void;
  openFileDialog: () => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
};

const AttachmentsContext =
  createContext<AttachmentsContextValue | null>(null);

export const usePromptInputAttachments = (): AttachmentsContextValue => {
  const context = useContext(AttachmentsContext);
  if (!context) {
    throw new Error(
      "usePromptInputAttachments must be used within a PromptInput"
    );
  }
  return context;
};

export function PromptInputAttachment({
  data,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement> & { data: Attachment }) {
  const attachments = usePromptInputAttachments();

  return (
    <div
      className={cn("group relative h-14 w-14 rounded-md border", className)}
      {...props}
    >
      {data.mediaType?.startsWith("image/") && data.url ? (
        <img
          alt={data.filename || "attachment"}
          className="size-full rounded-md object-cover"
          height={56}
          src={data.url}
          width={56}
        />
      ) : (
        <div className="flex size-full items-center justify-center text-muted-foreground">
          <PaperclipIcon className="size-4" />
        </div>
      )}
      <Button
        aria-label="Remove attachment"
        className="absolute -right-1.5 -top-1.5 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100"
        onClick={() => attachments.remove(data.id)}
        size="icon"
        type="button"
        variant="outline"
      >
        <XIcon className="h-3 w-3" />
      </Button>
    </div>
  );
}

export function PromptInputAttachments({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  children: (file: Attachment) => ReactNode;
}) {
  const attachments = usePromptInputAttachments();
  const [height, setHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      setHeight(el.getBoundingClientRect().height);
    });
    ro.observe(el);
    setHeight(el.getBoundingClientRect().height);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      aria-live="polite"
      className={cn(
        "overflow-hidden transition-[height] duration-200 ease-out",
        className
      )}
      style={{ height: attachments.files.length ? height : 0 }}
      {...props}
    >
      <div className="flex flex-wrap gap-2 p-3 pt-3" ref={contentRef}>
        {attachments.files.map((file) => (
          <Fragment key={file.id}>{children(file)}</Fragment>
        ))}
      </div>
    </div>
  );
}

export const PromptInputActionAddAttachments = ({
  label = "Add photos or files",
  ...props
}: { label?: string } & React.ComponentProps<typeof DropdownMenuItem>) => {
  const attachments = usePromptInputAttachments();

  return (
    <DropdownMenuItem
      {...props}
      onSelect={(e) => {
        e.preventDefault();
        attachments.openFileDialog();
      }}
    >
      <ImageIcon className="mr-2 size-4" /> {label}
    </DropdownMenuItem>
  );
};

export const PromptInput = ({
  className,
  accept,
  multiple,
  globalDrop,
  syncHiddenInput,
  maxFiles,
  maxFileSize,
  onError,
  onSubmit,
  children,
  ...props
}: {
  accept?: string;
  multiple?: boolean;
  globalDrop?: boolean;
  syncHiddenInput?: boolean;
  maxFiles?: number;
  maxFileSize?: number;
  onError?: (err: { code: string; message: string }) => void;
  onSubmit: (
    data: { text: string; files: Attachment[] },
    event: FormEvent<HTMLFormElement>
  ) => void;
  children: ReactNode;
} & React.FormHTMLAttributes<HTMLFormElement>) => {
  const [items, setItems] = useState<Attachment[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const anchorRef = useRef<HTMLSpanElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    const root = anchorRef.current?.closest("form");
    if (root instanceof HTMLFormElement) {
      formRef.current = root;
    }
  }, []);

  const openFileDialog = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const matchesAccept = useCallback(
    (f: File) => {
      if (!accept || accept.trim() === "") return true;
      if (accept.includes("image/*")) return f.type.startsWith("image/");
      return true;
    },
    [accept]
  );

  const add = useCallback(
    (files: File[] | FileList) => {
      const incoming = Array.from(files);
      const accepted = incoming.filter(matchesAccept);
      if (!accepted.length) {
        onError?.({ code: "accept", message: "No files match the accepted types." });
        return;
      }
      const sized = accepted.filter((f) =>
        maxFileSize ? f.size <= maxFileSize : true
      );
      if (!sized.length) {
        onError?.({
          code: "max_file_size",
          message: "All files exceed the maximum size.",
        });
        return;
      }
      setItems((prev) => {
        const capacity =
          typeof maxFiles === "number"
            ? Math.max(0, maxFiles - prev.length)
            : undefined;
        const capped =
          typeof capacity === "number" ? sized.slice(0, capacity) : sized;
        if (typeof capacity === "number" && sized.length > capacity) {
          onError?.({
            code: "max_files",
            message: "Too many files. Some were not added.",
          });
        }
        return prev.concat(
          capped.map((file) => ({
            id: nanoid(),
            type: "file",
            url: URL.createObjectURL(file),
            mediaType: file.type,
            filename: file.name,
          }))
        );
      });
    },
    [matchesAccept, maxFiles, maxFileSize, onError]
  );

  const remove = useCallback((id: string) => {
    setItems((prev) => {
      const found = prev.find((f) => f.id === id);
      if (found?.url) URL.revokeObjectURL(found.url);
      return prev.filter((f) => f.id !== id);
    });
  }, []);

  const clear = useCallback(() => {
    setItems((prev) => {
      prev.forEach((f) => f.url && URL.revokeObjectURL(f.url));
      return [];
    });
  }, []);

  useEffect(() => {
    if (syncHiddenInput && inputRef.current && items.length === 0) {
      inputRef.current.value = "";
    }
  }, [items, syncHiddenInput]);

  useEffect(() => {
    const form = formRef.current;
    if (!form) return;
    const onDragOver = (e: DragEvent) => {
      if (e.dataTransfer?.types?.includes("Files")) e.preventDefault();
    };
    const onDrop = (e: DragEvent) => {
      if (e.dataTransfer?.files?.length) {
        e.preventDefault();
        add(e.dataTransfer.files);
      }
    };
    form.addEventListener("dragover", onDragOver);
    form.addEventListener("drop", onDrop);
    return () => {
      form.removeEventListener("dragover", onDragOver);
      form.removeEventListener("drop", onDrop);
    };
  }, [add]);

  useEffect(() => {
    if (!globalDrop) return;
    const onDragOver = (e: DragEvent) => {
      if (e.dataTransfer?.types?.includes("Files")) e.preventDefault();
    };
    const onDrop = (e: DragEvent) => {
      if (e.dataTransfer?.files?.length) {
        e.preventDefault();
        add(e.dataTransfer.files);
      }
    };
    document.addEventListener("dragover", onDragOver);
    document.addEventListener("drop", onDrop);
    return () => {
      document.removeEventListener("dragover", onDragOver);
      document.removeEventListener("drop", onDrop);
    };
  }, [add, globalDrop]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) add(e.currentTarget.files);
  };

  const convertBlobUrlToDataUrl = async (url: string): Promise<string> => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const text = (formData.get("message") as string) || "";
    Promise.all(
      items.map(async ({ id, ...item }) =>
        item.url?.startsWith("blob:")
          ? { ...item, url: await convertBlobUrlToDataUrl(item.url) }
          : item
      )
    ).then((files) => {
      onSubmit({ text, files }, event);
      clear();
    });
  };

  const ctx = useMemo<AttachmentsContextValue>(
    () => ({
      files: items,
      add,
      remove,
      clear,
      openFileDialog,
      fileInputRef: inputRef,
    }),
    [items, add, remove, clear, openFileDialog]
  );

  return (
    <AttachmentsContext.Provider value={ctx}>
      <span aria-hidden className="hidden" ref={anchorRef} />
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept={accept}
        multiple={multiple}
        onChange={handleChange}
      />
      <form
        className={cn(
          "w-full divide-y overflow-hidden rounded-xl border bg-background shadow-sm",
          className
        )}
        onSubmit={handleSubmit}
        {...props}
      >
        {children}
      </form>
    </AttachmentsContext.Provider>
  );
};

export const PromptInputBody = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col", className)} {...props} />
);

export const PromptInputTextarea = ({
  onChange,
  className,
  placeholder = "What would you like to know?",
  ...props
}: React.ComponentProps<typeof Textarea>) => {
  const attachments = usePromptInputAttachments();

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      e.currentTarget.form?.requestSubmit();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLTextAreaElement>) => {
    const files = Array.from(e.clipboardData.items)
      .filter((i) => i.kind === "file")
      .map((i) => i.getAsFile())
      .filter(Boolean) as File[];
    if (files.length) {
      e.preventDefault();
      attachments.add(files);
    }
  };

  return (
    <Textarea
      name="message"
      className={cn(
        "w-full resize-none rounded-none border-none p-3 shadow-none outline-none ring-0",
        "field-sizing-content bg-transparent dark:bg-transparent",
        "max-h-48 min-h-16 focus-visible:ring-0",
        className
      )}
      placeholder={placeholder}
      onChange={onChange}
      onKeyDown={handleKeyDown}
      onPaste={handlePaste}
      {...props}
    />
  );
};

export const PromptInputToolbar = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex items-center justify-between p-1", className)} {...props} />
);

export const PromptInputTools = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex items-center gap-1 [&_button:first-child]:rounded-bl-xl",
      className
    )}
    {...props}
  />
);

export const PromptInputButton = ({
  variant = "ghost",
  className,
  size,
  ...props
}: React.ComponentProps<typeof Button>) => {
  const newSize =
    (size ?? Children.count(props.children) > 1) ? "default" : "icon";

  return (
    <Button
      {...props}
      type="button"
      size={newSize}
      variant={variant}
      className={cn(
        "shrink-0 gap-1.5 rounded-lg",
        variant === "ghost" && "text-muted-foreground",
        newSize === "default" && "px-3",
        className
      )}
    />
  );
};

export const PromptInputActionMenu = (props: React.ComponentProps<typeof DropdownMenu>) => (
  <DropdownMenu {...props} />
);

export const PromptInputActionMenuTrigger = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof PromptInputButton>) => (
  <DropdownMenuTrigger asChild>
    <PromptInputButton className={className} {...props}>
      {children ?? <PlusIcon className="size-4" />}
    </PromptInputButton>
  </DropdownMenuTrigger>
);

export const PromptInputActionMenuContent = ({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuContent>) => (
  <DropdownMenuContent align="start" className={cn(className)} {...props} />
);

export const PromptInputActionMenuItem = ({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuItem>) => (
  <DropdownMenuItem className={cn(className)} {...props} />
);

export const PromptInputSubmit = ({
  className,
  variant = "default",
  size = "icon",
  status,
  children,
  ...props
}: React.ComponentProps<typeof Button> & {
  status?: "submitted" | "streaming" | "error";
}) => {
  const Icon =
    status === "submitted" ? (
      <Loader2Icon className="size-4 animate-spin" />
    ) : status === "streaming" ? (
      <SquareIcon className="size-4" />
    ) : status === "error" ? (
      <XIcon className="size-4" />
    ) : (
      <SendIcon className="size-4" />
    );

  return (
    <Button
      {...props}
      type="submit"
      size={size}
      variant={variant}
      aria-label="Submit"
      className={cn("gap-1.5 rounded-lg", className)}
    >
      {children ?? Icon}
    </Button>
  );
};

export const PromptInputModelSelect = (props: React.ComponentProps<typeof Select>) => (
  <Select {...props} />
);

export const PromptInputModelSelectTrigger = ({
  className,
  ...props
}: React.ComponentProps<typeof SelectTrigger>) => (
  <SelectTrigger
    className={cn(
      "border-none bg-transparent font-medium text-muted-foreground shadow-none transition-colors",
      'hover:bg-accent hover:text-foreground [&[aria-expanded="true"]]:bg-accent [&[aria-expanded="true"]]:text-foreground',
      className
    )}
    {...props}
  />
);

export const PromptInputModelSelectContent = ({
  className,
  ...props
}: React.ComponentProps<typeof SelectContent>) => (
  <SelectContent className={cn(className)} {...props} />
);

export const PromptInputModelSelectItem = ({
  className,
  ...props
}: React.ComponentProps<typeof SelectItem>) => (
  <SelectItem className={cn(className)} {...props} />
);

export const PromptInputModelSelectValue = ({
  className,
  ...props
}: React.ComponentProps<typeof SelectValue>) => (
  <SelectValue className={cn(className)} {...props} />
);
