import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, FileText, ListChecks, Inbox, Link as LucideLink, LayoutGrid,
  Gift, HelpCircle, Upload, Headphones, UserRound, ChevronDown, ChevronUp, Menu
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const sidebarItemsConfig = [
  {
    label: "Articles",
    icon: <LayoutDashboard className="h-4 w-4" />,
    items: [
      { href: "/articles/create", label: "Create Article" },
      { href: "/articles/generated", label: "Generated Articles" },
      { href: "/articles/keyword", label: "Keyword Projects" },
      { href: "/articles/ai-keyword", label: "AI Keyword to Article" },
      { href: "/articles/steal-keyword", label: "Steal Competitor Keyword" },
      { href: "/articles/import-gsc", label: "Import Keyword from GSC" },
      { href: "/articles/manual-keyword", label: "Manual Keyword to Article" },
      { href: "/articles/bulk-keyword", label: "Bulk Keyword to Article" },
      { href: "/articles/longtail-keyword", label: "Longtail Keyword to Article" },
      { href: "/articles/settings", label: "Article Settings" },
    ],
  },
  { href: "/auto-blog", icon: <FileText className="h-4 w-4" />, label: "Auto Blog" },
  { href: "/internal-links", icon: <LucideLink className="h-4 w-4" />, label: "Internal Links" },
  { href: "/free-backlinks", icon: <ListChecks className="h-4 w-4" />, label: "Free Backlinks" },
  { href: "/integrations", icon: <LayoutGrid className="h-4 w-4" />, label: "Integrations" },
  { href: "/subscription", icon: <Inbox className="h-4 w-4" />, label: "Subscription" },
  { href: "/affiliate", icon: <Gift className="h-4 w-4" />, label: "Affiliate Program" },
  { href: "/help", icon: <HelpCircle className="h-4 w-4" />, label: "Help Center" },
  { href: "/updates", icon: <Upload className="h-4 w-4" />, label: "Updates" },
  { href: "/live-chat", icon: <Headphones className="h-4 w-4" />, label: "Live Chat Support" },
  { href: "/profile", icon: <UserRound className="h-4 w-4" />, label: "Profile" },
];

const Sidebar = () => {
  const location = useLocation();
  const [selectedOption, setSelectedOption] = useState('amazon.com');
  const [isArticlesOpen, setIsArticlesOpen] = useState(location.pathname.startsWith('/articles'));
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    if (mediaQuery.matches) {
      setIsCollapsed(true);
    }
  }, []);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const toggleArticles = () => {
    setIsArticlesOpen(!isArticlesOpen);
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const sidebarWidth = isCollapsed ? 'w-16' : 'w-64';
  const textVisibilityClass = isCollapsed ? 'hidden' : 'ml-2';
  const dropdownVisibilityClass = isCollapsed ? 'hidden' : 'mb-4';

  return (
    <div className={`md:flex flex-col text-xs border-r bg-white transition-all duration-300 ease-in-out ${sidebarWidth}`}>
      {/* Top Header */}
      <div className="p-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <span className={`text-2xl font-extrabold transition-all duration-300 ease-in-out ${isCollapsed ? 'hidden' : ''}`}>abun</span>
        </Link>
        <Button size="icon" variant='outline' className='cursor-pointer' onClick={toggleSidebar}>
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Dropdown */}
      <div className={`p-4 transition-all duration-300 ease-in-out ${dropdownVisibilityClass}`}>
        <div className="relative w-full">
          <select
            className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded-full shadow leading-tight focus:outline-none focus:shadow-outline text-sm"
            value={selectedOption}
            onChange={handleOptionChange}
          >
            <option>amazon.com</option>
            <option>flipkart.com</option>
            <option>myntra.com</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Sidebar Items */}
      <div className="flex-1 overflow-y-auto p-4">
        {sidebarItemsConfig.map((item) =>
          item.items ? (
            <div key={item.label} className="mb-2">
              <div
                onClick={toggleArticles}
                className={`flex items-center justify-between p-2 rounded-md hover:bg-gray-100 cursor-pointer ${location.pathname.startsWith('/articles') ? 'font-semibold' : ''}`}
                {...(isCollapsed && {
                  "data-tooltip-id": "sidebar-tooltip",
                  "data-tooltip-content": item.label,
                })}
              >
                <div className="flex items-center">
                  <span className='text-blue-600'>{item.icon}</span>
                  <span className={`transition-all duration-300 ease-in-out ${textVisibilityClass}`}>{item.label}</span>
                </div>
                {!isCollapsed && (isArticlesOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />)}
              </div>

              {isArticlesOpen && (
                <div className="ml-6">
                  {item.items.map((subItem) => (
                    <Link
                      key={subItem.label}
                      to={subItem.href}
                      className={`block p-2 rounded-md hover:bg-gray-100 ${location.pathname === subItem.href ? 'bg-gray-100 font-semibold' : ''}`}
                      {...(isCollapsed && {
                        "data-tooltip-id": "sidebar-tooltip",
                        "data-tooltip-content": subItem.label,
                      })}
                    >
                      <span className={`transition-all duration-300 ease-in-out ${textVisibilityClass}`}>{subItem.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div key={item.label} className="mb-2">
              <Link
                to={item.href}
                className={`flex items-center p-2 rounded-md hover:bg-gray-100 ${location.pathname === item.href ? 'bg-gray-100 font-semibold' : ''}`}

                {...(isCollapsed && {
                  "data-tooltip-id": "sidebar-tooltip",
                  "data-tooltip-content": item.label,
                })}
              >
                <span className='text-blue-600'>{item.icon}</span>
                <span className={`transition-all duration-300 ease-in-out ${textVisibilityClass}`}>{item.label}</span>
              </Link>
            </div>
          )
        )}
      </div>

      <Tooltip
        id="sidebar-tooltip"
        place="right"
        effect="solid"
        className="z-50 text-xs px-2 py-1 bg-black text-white rounded"
      />
    </div>
  );
};

export default Sidebar;