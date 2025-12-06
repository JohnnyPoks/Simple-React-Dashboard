import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Home,
  LayoutGrid,
  Box,
  FileText,
  FormInput,
  Image,
  BookOpen,
  X,
  HelpCircle,
  BarChart3,
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { name: 'Home', path: '/dashboard', icon: Home },
  { name: 'Interface', path: '/interface', icon: LayoutGrid },
  { name: 'Components', path: '/components', icon: Box },
  { name: 'Pages', path: '/pages', icon: FileText },
  { name: 'Forms', path: '/forms', icon: FormInput },
  { name: 'Gallery', path: '/gallery', icon: Image },
  { name: 'Documentation', path: '/docs', icon: BookOpen },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-50 h-full w-64 bg-[#1e293b] text-white transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header with Logo */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-slate-700">
            <div className="flex items-center gap-2">
              <div className="bg-primary p-1.5 rounded-md">
                <BarChart3 className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold">tabler</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-white hover:bg-slate-700"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <ScrollArea className="flex-1 py-4">
            <nav className="px-3 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={onClose}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </NavLink>
                );
              })}
            </nav>
          </ScrollArea>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-slate-700">
            <div className="bg-slate-700/50 rounded-lg p-4">
              <div className="flex items-center gap-2 text-amber-400 mb-2">
                <HelpCircle className="h-5 w-5" />
                <h3 className="text-sm font-semibold">Need Help?</h3>
              </div>
              <p className="text-xs text-slate-400 mb-3">
                Check our documentation
              </p>
              <Button 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                size="sm"
              >
                View Docs
              </Button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
