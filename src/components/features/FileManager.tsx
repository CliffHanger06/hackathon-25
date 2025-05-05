
import React from 'react';
import { 
  FolderOpen, 
  File, 
  FileText, 
  Image, 
  FileVideo, 
  Plus, 
  MoreVertical,
  Star,
  Clock,
  Download,
  Trash
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Fake data for the file manager
const recentFiles = [
  { id: 1, name: 'Project Proposal.docx', type: 'document', size: '2.4 MB', modified: '2h ago', starred: true },
  { id: 2, name: 'Budget_2023.xlsx', type: 'spreadsheet', size: '1.8 MB', modified: '5h ago', starred: false },
  { id: 3, name: 'Presentation_v2.pptx', type: 'presentation', size: '5.7 MB', modified: '1d ago', starred: true },
  { id: 4, name: 'Screenshot_12.png', type: 'image', size: '1.2 MB', modified: '1d ago', starred: false },
  { id: 5, name: 'Meeting_Recording.mp4', type: 'video', size: '58.2 MB', modified: '3d ago', starred: false },
];

const folders = [
  { id: 1, name: 'Documents', count: 43, color: 'bg-blue-500' },
  { id: 2, name: 'Images', count: 128, color: 'bg-emerald-500' },
  { id: 3, name: 'Downloads', count: 17, color: 'bg-amber-500' },
  { id: 4, name: 'Projects', count: 9, color: 'bg-assistant-violet' },
];

const FileManager: React.FC = () => {
  return (
    <Card className="glass-panel shadow-xl assistant-shadow w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl flex items-center gap-2">
          <FolderOpen size={20} className="text-assistant-glow" />
          File Manager
        </CardTitle>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1 border-white/10 text-xs">
            <Plus size={14} />
            <span>New</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="recent" className="w-full">
          <TabsList className="grid grid-cols-4 mb-4 bg-assistant-surface">
            <TabsTrigger value="recent">Recent</TabsTrigger>
            <TabsTrigger value="folders">Folders</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="suggested">Suggested</TabsTrigger>
          </TabsList>
          
          <TabsContent value="recent" className="space-y-4">
            {/* Recent Files List */}
            <div className="bg-assistant-surface/30 rounded-md">
              <div className="grid grid-cols-12 py-2 px-4 text-xs text-muted-foreground border-b border-white/5">
                <div className="col-span-6">Name</div>
                <div className="col-span-2">Size</div>
                <div className="col-span-3">Modified</div>
                <div className="col-span-1"></div>
              </div>
              
              <div className="divide-y divide-white/5">
                {recentFiles.map((file) => (
                  <div key={file.id} className="grid grid-cols-12 py-2 px-4 items-center hover:bg-white/5 group">
                    <div className="col-span-6 flex items-center gap-3">
                      {/* File type icon */}
                      <div className="flex-shrink-0">
                        {file.type === 'document' && <FileText size={18} className="text-blue-400" />}
                        {file.type === 'spreadsheet' && <FileText size={18} className="text-emerald-400" />}
                        {file.type === 'presentation' && <FileText size={18} className="text-amber-400" />}
                        {file.type === 'image' && <Image size={18} className="text-purple-400" />}
                        {file.type === 'video' && <FileVideo size={18} className="text-red-400" />}
                      </div>
                      
                      {/* File name */}
                      <div className="truncate">
                        <span className="text-sm font-medium">{file.name}</span>
                      </div>
                      
                      {/* Star indicator */}
                      {file.starred && (
                        <Star size={14} className="text-amber-400 ml-1" fill="currentColor" />
                      )}
                    </div>
                    
                    <div className="col-span-2 text-xs text-muted-foreground">
                      {file.size}
                    </div>
                    
                    <div className="col-span-3 text-xs text-muted-foreground flex items-center gap-1">
                      <Clock size={12} />
                      <span>{file.modified}</span>
                    </div>
                    
                    <div className="col-span-1 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100">
                            <MoreVertical size={14} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48 bg-assistant-surface border-white/10">
                          <DropdownMenuItem>
                            <Download size={14} className="mr-2" />
                            <span>Download</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Star size={14} className="mr-2" />
                            <span>{file.starred ? 'Remove star' : 'Star file'}</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash size={14} className="mr-2" />
                            <span>Delete</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="folders" className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {folders.map((folder) => (
                <div key={folder.id} className="bg-assistant-surface rounded-lg p-4 hover:bg-assistant-surface/80 cursor-pointer transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`${folder.color} rounded-md p-2 text-white`}>
                      <FolderOpen size={18} />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium">{folder.name}</span>
                      <span className="text-xs text-muted-foreground">{folder.count} items</span>
                    </div>
                  </div>
                  <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                    <div className={`${folder.color} h-full`} style={{ width: `${Math.min(folder.count, 100)}%` }}></div>
                  </div>
                </div>
              ))}
              
              {/* Add folder button */}
              <div className="border border-dashed border-white/10 rounded-lg p-4 flex items-center justify-center hover:bg-assistant-surface/50 cursor-pointer transition-colors">
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <Plus size={20} />
                  <span className="text-sm">Add Folder</span>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="favorites">
            <div className="flex items-center justify-center h-32 text-muted-foreground">
              <div className="text-center">
                <Star size={32} className="mx-auto mb-2 opacity-20" />
                <p>Your favorite files will appear here</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="suggested">
            <div className="flex items-center justify-center h-32 text-muted-foreground">
              <div className="text-center">
                <File size={32} className="mx-auto mb-2 opacity-20" />
                <p>AI suggestions will appear here</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default FileManager;
