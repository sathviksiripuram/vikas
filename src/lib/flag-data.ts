/**
 * Country flags, inlined as data URIs.
 *
 * These were previously 11 files on a third-party CDN, which meant up to 33
 * separate cross-origin requests on the home page alone (the hero picker, the
 * destination cards and the footer each list every country). On a phone that
 * is 33 round trips for a few hundred bytes each — the connection setup cost
 * dwarfed the payload. Inlined they cost no requests at all, and the whole
 * set adds about 2 KB to the bundle.
 *
 * Generated from flagcdn.com/w40 (40x30 PNG). To refresh, re-run the
 * generator in scripts or replace a value by hand.
 */
export const FLAG_DATA: Record<string, string> = {
  "usa":
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAVBAMAAADGNLEtAAAALVBMVEX////GU3LZjKGzGUINM2PsxtAYPWotT3hed5enma46WoBPa46zGkMkR3Jrgp+6ntXWAAAAiklEQVQY02Nwc0lJcQMSxghgw+CRVdaWkVXWooQEGFxaPLxKWjxcGJCBn1fJExAWRAJglUuAKlEEPdyXgA1A0e62LTu9bFt2CopF3iCh9LItKE5yX5tVe31tVgmq9pL0NLcy95RQJMAAdiUQo2ifCQUoKrECY0xgw6CEBWDXLogFYBfECrBahM1JAItMTcEiMDpsAAAAAElFTkSuQmCC",
  "uk":
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAUCAMAAADImI+JAAAANlBMVEX////w8vfyxcx8jbJCWpAOLHFVa5sBIWnIEC7WTGLnv8qAkLTheYpecqHx0digrMfz3+T21dqBS5WQAAAApUlEQVQoz8WTyxpFMAyEpyqOuhTv/7IntImmurAzC59kfsIIhA5wnn6iASMLgzbIT2Fk6joUaAUKBsiJm+kJ0iyuR1mQBam8Cex1dINkZ6EesSZwrR8JfdYWl7AcbCRw5ypytYmPpy6w3X6jL8HXL6PxOODgTPYEcnXmFe94cuBsdJzwpIFrRwK3WPkJLQqL2aUoUVisXjOvLizWWNyMVljrV0gz/wdhEi0lRIbcAAAAAElFTkSuQmCC",
  "canada":
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAUCAMAAADImI+JAAAASFBMVEX/////ubn/oqL/Z2f/Jib/09P/7e3/AAD/+/v/Gxv/W1v/rq7/eXn/nZ3/DAz/OTn/AwP/Pj7//Pz/QED/PT3/g4P/xsb/xcWY5npoAAAAkUlEQVQoz43TyQ7DIAxFUQbDNZCx4///aTdt00ohsXdPHIFsGce33E79nO5AvRjhGCxQVYs41fMbpUIVw9MzwHwKk4sA0aUj6IdW7iNAGEobfBfmBbgC3IAld6HKllhEuzDwV6HfjJ+2OPmjrlP5pJKOx5PfsuSTOWZZY61xlWxYiufDuD3eG2FrRpiSEe5+hRcblQ+AegtNbgAAAABJRU5ErkJggg==",
  "australia":
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAUCAMAAADImI+JAAAAdVBMVEUBIWn+/v8LKm8rRoLsS2lZa5sCI2rkACvAyNojP317jLGrtc2qtc3FzN1fc6FBWY/5w83ecIr+8vQRL3P5x9DY3ejU2OVeZpZLVIn709oYNndNZJacqcWLmrra3unVZ4Xy9Pj22uFEXJHIz94VM3XUZYPb3+rlcwqvAAAAz0lEQVQoz7WQyRKDIBBEB2STRHHfTdQs//+JQVxiSlNFDunLAPOomW4gycVnAHDi/KwLoyEJ4EjFgyQpXcBcY54C+IpmdAQNNmxavv8+C62sLyPEeVRGXTbelx72BF5BfqC16bpgB25lRnd6KucoKvuP0UaOdObT4CUkzEczNA3ItZheq2oxhKYUlMHmeNiK4ps3+7jXzFSN0W3g/jMgY5WSwS+i1BLcBrS4c6x+xrJpZGxDtgi1NpwSCAlls44rxG5vfEnxHozjvUFaw//0ApepC3HnUeodAAAAAElFTkSuQmCC",
  "new-zealand":
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAUCAMAAADImI+JAAAAclBMVEUBIWn68/artc2qtc0OLXHYVmtbbZzIEC7AyNrPd4z0zdPPZXskQX1dZpT12N3yxs0CImpGV4w+T4bGboXFzN3U2OXVUWja3uk6R4DLRl4wSINtapYjO3nX3Of8/P1EXJFYWovJaYDMJkKkdJGceZnYV2wLvzvsAAAAuElEQVQoz9WQWxOCIBCFlxIIBMRral6yy///iwmK5WQNLz10XnZhvzlndqHgR6IBYEfpfiyasILDluIU85Y4UDIcZTHARzQnBrRY/zIKgmd/GJUrhTpKkUIoN283E8MgFpBuaBkyBn7gWzQaUyntkFKraKtz7bo+45hJswxpI5y6nU+zaRFOtnHG70zO59EWTcz/7SInsiynOrqtD36MsDW8CvgqDX+mpvHjkqpK/Mgw9IwW9Q/3egATpQmIac+/QgAAAABJRU5ErkJggg==",
  "ireland":
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAUBAMAAAANaGKIAAAAD1BMVEUWm2L/iD7///+y3sv/174BQJ8QAAAAGElEQVQY02NgAANmJTBwFAQDhlHBwSQIALIxHTlPIfkHAAAAAElFTkSuQmCC",
  "germany":
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAYAgMAAAD16ldTAAAACVBMVEUAAADdAAD/zgDGIigcAAAAFUlEQVQY02NgoBEIhQPqMlfBAVWZANYST7G6bxb2AAAAAElFTkSuQmCC",
  "france":
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAbBAMAAAD8PtBdAAAAD1BMVEUAJlT////OESbvr7aqtsYrjF9NAAAAGUlEQVQoz2NgAAMWQTAwUgIDhlHBUUG8ggBpKyX5efKDZQAAAABJRU5ErkJggg==",
  "italy":
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAbBAMAAAD8PtBdAAAAElBMVEXOKzcAkkb///+q28EBkkbvt7tlcfnnAAAAGUlEQVQoz2NwFAQBYSUwCGCAgFHBUUG8ggBTFC/I4rFoIQAAAABJRU5ErkJggg==",
  "uae":
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAUBAMAAAANaGKIAAAAElBMVEUAAAAAhD1UVFRVrX7IEC7///8VlrW7AAAAJElEQVQY02NwAQFBVMBAX0FjVAARDEUFdBZUQgUQQQY0QC9BAGh6Q2h5ljhMAAAAAElFTkSuQmCC",
  "europe":
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAbCAMAAAA5zj1cAAAANlBMVEUAM5k1Unj4yAJQY2gbQ4dWZ2MmSYEKOJLmvQwBM5dIXm1DW290eFCNh0LvwwedkDqwnC1pclj9NsmTAAAAiklEQVQ4y82TyQ7DIBBDzQyzELL+/8/2kChKGjqt2kPjm8WTEZYBbqWUPoGAPI4ZqDEntADMwEISgjptSXXSAMuh3VUG746+86G0yd5PB+b9i0grFtgvZJdCpBlpTk+NKHmTlGsi/7qG/xa+P9Piwuu83c5zPMhEsi5cKJ65Zl0Xrlnft8R8rz/8AMaKAyoFhDUUAAAAAElFTkSuQmCC",
};
