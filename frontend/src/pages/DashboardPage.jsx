import { useState, useEffect, useMemo } from 'react';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, ChevronDown } from 'lucide-react';
import publisherLogo from '../assets/wordpress-logo.svg';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { dummyData } from '../data/dummyData'


const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState("generated");
  const [articles, setArticles] = useState(dummyData);
  const [selectedArticles, setSelectedArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const sortData = (key) => {
    if (sortBy === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(key);
      setSortDirection('asc');
    }
  };

  const sortedArticles = useMemo(() => {
    const filtered = articles.filter(article =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.keyword.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (!sortBy) return filtered;

    return [...filtered].sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];

      if (aValue === null || aValue === undefined) return sortDirection === 'asc' ? 1 : -1;
      if (bValue === null || bValue === undefined) return sortDirection === 'asc' ? -1 : 1;

      if (typeof aValue === 'string') {
        return sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      }
      return sortDirection === 'asc' ? (aValue - bValue) : (bValue - aValue);
    });
  }, [articles, searchQuery, sortBy, sortDirection]);

  if (loading) {
    return (
      <div className="container mx-auto py-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <Skeleton width={150} height={30} />
          </div>
          <Skeleton width={300} height={35} />
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[20px]"><Skeleton width={20} /></TableHead>
                <TableHead><Skeleton width={150} /></TableHead>
                <TableHead><Skeleton width={200} /></TableHead>
                <TableHead><Skeleton width={80} /></TableHead>
                <TableHead><Skeleton width={100} /></TableHead>
                <TableHead><Skeleton width={80} /></TableHead>
                <TableHead><Skeleton width={80} /></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell><Skeleton width={20} /></TableCell>
                  <TableCell><Skeleton /></TableCell>
                  <TableCell><Skeleton /></TableCell>
                  <TableCell><Skeleton width={50} /></TableCell>
                  <TableCell><Skeleton width={80} /></TableCell>
                  <TableCell><Skeleton width={80} /></TableCell>
                  <TableCell><Skeleton width={80} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">

      <h2 className="text-3xl text-center font-bold mb-3">Articles</h2>

      <div className='flex items-center justify-center'>
        <div className="inline-flex items-center border rounded-full overflow-hidden">
          <button
            onClick={() => setActiveTab("generated")}
            className={`px-4 py-2 text-xs font-medium transition-colors rounded-r-none ${activeTab === "generated" ? "bg-blue-600 text-white" : "bg-white text-black hover:bg-gray-100"}`}>
            Generated Articles
          </button>

          <button
            onClick={() => setActiveTab("published")}
            className={`px-4 py-2 text-xs font-medium transition-colors ${activeTab === "published" ? "bg-blue-600 text-white" : "bg-white text-black border-l border-gray-300 hover:bg-gray-100"}`}>
            Published Articles
          </button>

          <button
            onClick={() => setActiveTab("scheduled")}
            className={`px-4 py-2 text-xs font-medium transition-colors ${activeTab === "scheduled" ? "bg-blue-600 text-white" : "bg-white text-black border-l border-gray-300 hover:bg-gray-100"}`}>
            Scheduled Articles
          </button>

          <button
            onClick={() => setActiveTab("archived")}
            className={`px-4 py-2 text-xs font-medium transition-colors rounded-r-full ${activeTab === "archived" ? "bg-blue-600 text-white" : "bg-white text-black border-l border-gray-300 hover:bg-gray-100"}`}>
            Archived Articles
          </button>
        </div>
      </div>

      <div className='flex items-center justify-center mt-7 mb-5'>
        <Input
          type="search"
          placeholder="Search for Title & Keywords.."
          value={searchQuery}
          onChange={handleSearch}
          className='max-w-xs border-gray-300 focus-visible:ring-0 focus-visible:border-2 focus-visible:border-black'
        />
      </div>

      <div>
        <Table className='text-xs'>
          <TableHeader>
            <TableRow className='border-gray-400'>
              <TableHead className="w-[20px]">
                <input
                  type="checkbox"
                  checked={selectedArticles.length === sortedArticles.length && sortedArticles.length > 0}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedArticles(sortedArticles.map(article => article.id));
                    } else {
                      setSelectedArticles([]);
                    }
                  }}
                />
              </TableHead>
              <TableHead onClick={() => sortData('title')} className="cursor-pointer font-semibold">
                <ArrowUpDown className="inline-block h-4 w-4" /> Article Title
              </TableHead>
              <TableHead onClick={() => sortData('keyword')} className="cursor-pointer font-semibold">
                <ArrowUpDown className="inline-block h-4 w-4" /> Keyword [Traffic]
              </TableHead>
              <TableHead onClick={() => sortData('words')} className="cursor-pointer font-semibold">
                <ArrowUpDown className="inline-block h-4 w-4" /> Words
              </TableHead>
              <TableHead onClick={() => sortData('createdOn')} className="cursor-pointer font-semibold">
                <ArrowUpDown className="inline-block h-4 w-4" /> Created On
              </TableHead>
              <TableHead className='font-semibold text-center'>Action</TableHead>
              <TableHead className='font-semibold text-center'>Publish</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {sortedArticles.map((article) => (
              <TableRow key={article.id}>
                <TableCell className="font-medium py-1">
                  <input
                    type="checkbox"
                    checked={selectedArticles.includes(article.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedArticles(prev => [...prev, article.id]);
                      } else {
                        setSelectedArticles(prev => prev.filter(id => id !== article.id));
                      }
                    }}
                  />
                </TableCell>
                <TableCell className='py-1'>{article.title.slice(0, 50) + (article.title.length > 50 ? '...' : '')}</TableCell>
                <TableCell className='py-1'>{article.keyword.slice(0, 35) + (article.keyword.length > 35 ? '...' : '')}</TableCell>
                <TableCell className='py-1'>{article.words}</TableCell>
                <TableCell className='py-1'>{article.createdOn || '---'}</TableCell>
                <TableCell className='py-1'>
                  <Button size="sm" variant="outline" className='px-6 text-xs font-medium bg-transparent border-green-500 text-green-500 hover:bg-green-100 hover:border-green-700 hover:text-green-700 hover:cursor-pointer'>
                    View
                  </Button>
                </TableCell>
                <TableCell className='py-1'>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="link" size="sm" className="cursor-pointer gap-1">
                        <img src={article.logo || publisherLogo} alt="Publisher logo" width={25} className="inline-block" />
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem><Button variant='link'>Publish</Button></DropdownMenuItem>
                      <DropdownMenuItem><Button variant='link'>Unpublish</Button></DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}

            {sortedArticles.length === 0 && !loading && (
              <TableRow>
                <TableCell colSpan={7} className="text-center p-4">
                  No articles found.
                </TableCell>
              </TableRow>
            )}

          </TableBody>
        </Table>
      </div>

      <div className='bg-gray-400 w-full h-[0.5px] mt-2'></div>

      <div className="mt-7 flex items-center justify-between text-sm text-gray-600">
        <div className='flex items-center justify-start gap-2'>
          <div>Total <span className='font-bold text-black'>{articles.length}</span> Article Titles</div>

          <span>|</span>

          <div className="flex items-center space-x-2">
            Show
            <select className="rounded-md border border-input bg-transparent px-2 py-1 text-sm text-black mx-1">
              <option>10</option>
              <option>20</option>
              <option>50</option>
            </select>
            entries per page
          </div>
        </div>
        <div>1/1</div>
      </div>

    </div>
  );
};

export default DashboardPage;