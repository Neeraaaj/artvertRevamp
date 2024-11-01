const breakpoints = {
    sm: '@media (min-width: 640px)',
    md: '@media (min-width: 768px)',
    lg: '@media (min-width: 1024px)',
    xl: '@media (min-width: 1280px)',
    '2xl': '@media (min-width: 1536px)',
  };
  
  export const styles = {
    container: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      justifyContent: 'space-between',
      padding: '1rem',
    },
  
    introArticle: {
      flex: 1,
      alignSelf: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1rem',
      textAlign: 'center',
      [breakpoints.md]: {
        alignSelf: 'flex-end',
        flexDirection: 'row',
        textAlign: 'start',
      },
    },
  
    introText: {
      maxWidth: '30ch',
      fontWeight: 200,
      fontSize: '1.25rem',
      color: '#6b7280',
      textAlign: 'right',
    },
  
    introDivider: {
      width: '18rem',
      border: 0,
      borderTop: '1px solid #6b7280',
      [breakpoints.md]: {
        width: '24rem',
      },
    },
  
    mainArticle: {
      flex: 2,
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      alignItems: 'center',
      width: '100%',
      [breakpoints.md]: {
        width: 'auto',
      },
    },
  
    mainSection: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1rem',
      textAlign: 'center',
      [breakpoints.md]: {
        flexDirection: 'row',
        gap: '3rem',
        textAlign: 'start',
      },
    },
  
    mainImage: {
      display: 'none',
      width: '12rem',
      height: '3rem',
      borderRadius: '1.5rem',
      objectFit: 'cover',
      [breakpoints.sm]: {
        display: 'block',
      },
      [breakpoints.lg]: {
        width: '14rem',
        height: '5rem',
      },
      [breakpoints['2xl']]: {
        width: '18rem',
        height: '6rem',
      },
    },
  
    heading: {
      textTransform: 'capitalize',
      fontSize: '2.25rem',
      fontWeight: 100,
      [breakpoints.lg]: {
        fontSize: '3.75rem',
      },
      [breakpoints['2xl']]: {
        fontSize: '6rem',
      },
    },
  
    headingBold: {
      fontWeight: 800,
      color: '#f97316',
      transition: 'color 0.3s ease',
      '&:hover': {
        color: '#22c55e',
      },
    },
  
    mainButton: {
      textTransform: 'uppercase',
      width: '9rem',
      height: '3rem',
      borderRadius: '25px',
      color: 'black',
      backgroundColor: '#fb923c',
      border: 'none',
      fontSize: '1rem',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
      '&:hover': {
        backgroundColor: '#f97316',
      },
      [breakpoints.lg]: {
        width: '12rem',
        height: '4rem',
        fontSize: '1.25rem',
      },
      [breakpoints['2xl']]: {
        width: '16rem',
        height: '5rem',
        fontSize: '1.5rem',
      },
    },
  
    servicesArticle: {
      flex: 2,
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      maxWidth: '80rem',
      margin: 'auto',
      [breakpoints.md]: {
        flexDirection: 'row',
      },
    },
  
    serviceItem: {
      border: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '1rem',
      padding: '0.5rem',
      color: '#f3f4f6',
      transition: 'all 0.3s ease',
      [breakpoints.md]: {
        border: '1px solid #6b7280',
        padding: '1.5rem',
      },
      [breakpoints['2xl']]: {
        padding: '2rem',
      },
      '&:hover': {
        backgroundColor: '#f3f4f6',
        color: 'black',
        borderRadius: '0.375rem',
      },
    },
  
    serviceTitle: {
      fontSize: '1.25rem',
      fontWeight: 600,
    },
  
    serviceDescription: {
      display: 'none',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
      [breakpoints.md]: {
        display: 'block',
      },
    },
  
    serviceButton: {
      backgroundColor: 'transparent',
      border: '1px solid #fb923c',
      borderRadius: '0.5rem',
      color: '#fb923c',
      width: '100%',
      padding: '0.5rem',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      [breakpoints.md]: {
        backgroundColor: '#fb923c',
        border: 'none',
        color: 'black',
        '&:hover': {
          backgroundColor: '#f97316',
        },
      },
    },
  };