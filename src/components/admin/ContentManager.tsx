import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Loader2, Eye, Save } from "lucide-react";
import { RichTextEditor } from "./RichTextEditor";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const ContentManager = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState<Record<string, any>>({});
  const [previewContent, setPreviewContent] = useState<string>("");
  const [showPreview, setShowPreview] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState<Record<string, boolean>>({});

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('website_content')
        .select('*');
      
      if (error) throw error;
      
      const contentMap: Record<string, any> = {};
      data?.forEach(item => {
        if (!contentMap[item.page]) {
          contentMap[item.page] = {};
        }
        contentMap[item.page][item.section] = item.content;
      });
      
      setContent(contentMap);
    } catch (error) {
      console.error('Error loading content:', error);
      toast({
        title: "Error",
        description: "Failed to load content",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const saveContent = async (page: string, section: string, newContent: string) => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('website_content')
        .upsert({
          page,
          section,
          content: newContent,
        }, {
          onConflict: 'page,section'
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Content published successfully",
      });

      // Update local content state
      setContent(prev => ({
        ...prev,
        [page]: {
          ...prev[page],
          [section]: newContent
        }
      }));

      // Clear unsaved changes flag
      setUnsavedChanges(prev => ({
        ...prev,
        [`${page}-${section}`]: false
      }));

    } catch (error) {
      console.error('Error saving content:', error);
      toast({
        title: "Error",
        description: "Failed to publish content",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleContentChange = (page: string, section: string, newContent: string) => {
    setPreviewContent(newContent);
    // Mark this section as having unsaved changes
    setUnsavedChanges(prev => ({
      ...prev,
      [`${page}-${section}`]: true
    }));
  };

  const pages = [
    {
      id: "home",
      label: "Home Page",
      sections: [
        { id: "hero", label: "Hero Section" },
        { id: "programs", label: "Programs" },
        { id: "stats", label: "Statistics" },
      ]
    },
    {
      id: "about",
      label: "About Page",
      sections: [
        { id: "main", label: "Main Content" },
        { id: "mission", label: "Mission & Vision" },
      ]
    },
    {
      id: "staff",
      label: "Staff Page",
      sections: [
        { id: "departments", label: "Departments" },
        { id: "representatives", label: "Representatives" },
      ]
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Content Management</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Eye className="h-4 w-4" />
              Preview
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl h-[80vh]">
            <DialogHeader>
              <DialogTitle>Content Preview</DialogTitle>
            </DialogHeader>
            <div className="overflow-y-auto prose max-w-none" dangerouslySetInnerHTML={{ __html: previewContent }} />
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="home">
        <TabsList className="grid w-full grid-cols-3">
          {pages.map((page) => (
            <TabsTrigger key={page.id} value={page.id}>
              {page.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {pages.map((page) => (
          <TabsContent key={page.id} value={page.id} className="space-y-4">
            {page.sections.map((section) => (
              <Card key={section.id}>
                <CardHeader>
                  <CardTitle>{section.label}</CardTitle>
                  <CardDescription>Edit {section.label.toLowerCase()} content</CardDescription>
                </CardHeader>
                <CardContent>
                  <RichTextEditor
                    content={content[page.id]?.[section.id] || ""}
                    onChange={(newContent) => handleContentChange(page.id, section.id, newContent)}
                  />
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button 
                    onClick={() => saveContent(page.id, section.id, previewContent)}
                    disabled={saving || !unsavedChanges[`${page.id}-${section.id}`]}
                    className="gap-2"
                  >
                    {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                    <Save className="h-4 w-4" />
                    Publish Changes
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};