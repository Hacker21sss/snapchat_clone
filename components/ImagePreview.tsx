import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader } from "./ui/dialog";
import Image from "next/image";

interface ImagePreviewProps {
    selectedFile: string;
    close: () => void;
    imageChange: () => void;
    setFlag: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ImagePreview({ selectedFile, close, imageChange, setFlag }: ImagePreviewProps) {
    return (
        <Dialog open={!!selectedFile} onOpenChange={close}>
            <DialogContent className="sm:max-w-[425px] bg-white border max-w-xl flex flex-col">
                <DialogHeader>
                    <div className="flex items-center justify-center relative h-3/4 my-auto">
                        <Image
                            src={selectedFile}
                            alt="Selected File"
                            width={400}
                            height={400}
                            className="rounded-md border border-gray-400 object-contain"
                        />
                    </div>
                </DialogHeader>
                <DialogFooter className="flex justify-between p-4">
                    <DialogClose asChild>
                        <Button className="rounded-full" variant={'destructive'} onClick={close} size={'sm'}>
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button className="rounded-full" onClick={imageChange} size={'sm'}>
                        Change
                    </Button>
                    <Button className="rounded-full px-4 bg-green-500 hover:bg-green-400" onClick={() => setFlag(true)} size={'sm'}>
                        Next
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
