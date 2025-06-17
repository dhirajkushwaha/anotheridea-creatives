import React from 'react'
import { useRouter } from 'next/router'
import { colorIndex, pageIndex, pageIndexInv } from '.'

function WorknavItem({ link, label, index, activeIndex, color }) {
  return (
    <a href={link} className={`WorkNav-item ${activeIndex === index ? 'Active-item' : ''}`}>
      <div className="WorkNav-itemInner">
        <div className="WorkNav-itemLabel">{label}</div>
        <svg xmlns="http://www.w3.org/2000/svg" className="WorkNav-itemArrow icon sprite-icons">
          <path d="M8.3 2.2L15 8.9H0V12h15l-6.7 6.7 2.2 2.2L21 10.4 10.5 0 8.3 2.2z" />
        </svg>
        <div className="WorkNav-itemColorWrap">
          <div className="WorkNav-itemColor" style={{ backgroundColor: color }}></div>
        </div>
      </div>
    </a>
  );
}

export default function Worknav() {
  const router = useRouter();
  
  // Better path extraction that handles query params and trailing slashes
  const currentPath = router.asPath.split('?')[0]; // Remove query params
  const pathParts = currentPath.split('/').filter(part => part !== ''); // Split and remove empty parts
  const currentPage = pathParts[pathParts.length - 1] || 'branding'; // Get last part or default
  
  console.log('Current path:', router.asPath); // Debugging
  console.log('Current page:', currentPage); // Debugging
  
  const activeIndex = pageIndex[currentPage] ?? 0;
  
  console.log('Active index:', activeIndex); // Debugging
  
  // Check if window is available (Next.js SSR)
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 1023;

  const navItems = [];

  if (isMobile) {
    navItems.push(
      <WorknavItem
        key={activeIndex}
        index={activeIndex}
        activeIndex={activeIndex}
        link={`/work/${currentPage}`}
        label={currentPage}
        color={colorIndex[activeIndex]}
      />
    );

    for (let i = 0; i < 5; i++) {
      if (i !== activeIndex) {
        navItems.push(
          <WorknavItem
            key={i}
            index={i}
            activeIndex={activeIndex}
            link={`/work/${pageIndexInv[i]}`}
            label={pageIndexInv[i]}
            color={colorIndex[i]}
          />
        );
      }
    }
  } else {
    for (let i = 0; i < 5; i++) {
      navItems.push(
        <WorknavItem
          key={i}
          index={i}
          activeIndex={activeIndex}
          link={`/work/${pageIndexInv[i]}`}
          label={pageIndexInv[i]}
          color={colorIndex[i]}
        />
      );
    }
  }

  return (
    <div className="WorkNav">
      <div className="WorkNav-inner">
        <div className="WorkNav-wrapper">{navItems}</div>
      </div>
    </div>
  );
}