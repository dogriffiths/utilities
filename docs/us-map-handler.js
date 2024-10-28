// us-map-handler.js
import { stateProperties } from './state-data.js';

export class USMapHandler {
    constructor(svgId, sidebarId) {
        this.svg = d3.select(svgId);
        this.g = this.svg.append('g');
        this.active = d3.select(null);
        this.sidebarId = sidebarId;
        this.counties = null;
        this.states = null;
        this.isDarkMode = false;
        this.countyData = new Map();
        
        this.projection = d3.geoAlbersUsa()
            .scale(1300)
            .translate([500, 300]);
            
        this.path = d3.geoPath()
            .projection(this.projection);
            
        // Create initial color scale
        this.colorScale = d3.scaleSequential()
            .interpolator(d3.interpolateBlues);
            
        // Bind methods
        this.clicked = this.clicked.bind(this);
        this.reset = this.reset.bind(this);
        this.updateSidebar = this.updateSidebar.bind(this);
    }


    createLegend(maxDensity) {
        // Remove existing legend if any
        this.svg.selectAll('.legend').remove();
        
        const legendWidth = 200;
        const legendHeight = 20;
        
        const legend = this.svg.append('g')
            .attr('class', 'legend')
            .attr('transform', `translate(20, ${550})`);
            
        const legendScale = d3.scaleLinear()
            .domain([0, maxDensity])
            .range([0, legendWidth]);
            
        const legendAxis = d3.axisBottom(legendScale)
            .tickFormat(d => `${Math.round(d)}/sq mi`);
            
        legend.append('g')
            .call(legendAxis);
            
        const gradientData = Array.from({ length: 100 }, (_, i) => i / 100 * maxDensity);
        
        legend.selectAll('rect')
            .data(gradientData)
            .enter()
            .append('rect')
            .attr('x', d => legendScale(d))
            .attr('y', -legendHeight)
            .attr('width', legendWidth / gradientData.length + 1)
            .attr('height', legendHeight)
            .style('fill', d => this.colorScale(d));
    }

async initialize() {
        try {
            const [us, counties] = await Promise.all([
                d3.json('https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json'),
                d3.json('https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json')
            ]);
            
            this.states = topojson.feature(us, us.objects.states);
            this.counties = topojson.feature(counties, counties.objects.counties);

            // Calculate county areas and densities
            this.counties.features.forEach(county => {
                const area = this.path.area(county);
                const sqMiles = area / 10;
                this.countyData.set(county.id, {
                    area: sqMiles,
                    name: county.properties.name
                });
            });

            // Add population data
            Object.entries(stateProperties).forEach(([stateId, stateInfo]) => {
                const stateCounties = this.counties.features.filter(c => c.id.startsWith(stateId));
                const totalStateArea = stateCounties.reduce((sum, county) => 
                    sum + this.countyData.get(county.id).area, 0);
                
                stateCounties.forEach(county => {
                    const countyData = this.countyData.get(county.id);
                    const areaRatio = countyData.area / totalStateArea;
                    const estimatedPop = Math.round(stateInfo.population * areaRatio);
                    countyData.population = estimatedPop;
                    countyData.density = estimatedPop / countyData.area;
                });
            });

            // Update color scale
            const densities = Array.from(this.countyData.values()).map(d => d.density);
            const maxDensity = d3.quantile(densities, 0.95);
            this.colorScale.domain([0, maxDensity]);
            
            this.createLegend(maxDensity);
            
            // Create groups for states and counties
            this.countyGroup = this.g.append('g')
                .attr('class', 'counties')
                .style('opacity', 0);
                
            this.stateGroup = this.g.append('g')
                .attr('class', 'states');
            
            // Draw counties (initially hidden)
            this.countyGroup.selectAll('path')
                .data(this.counties.features)
                .enter()
                .append('path')
                .attr('d', this.path)
                .attr('class', 'county')
                .style('fill', d => {
                    const countyInfo = this.countyData.get(d.id);
                    return countyInfo ? this.colorScale(countyInfo.density) : '#ccc';
                })
                .style('stroke', '#fff')
                .style('stroke-width', '0.5px')
                .style('display', 'none')
                .on('mouseover', (event, d) => {
                    const countyInfo = this.countyData.get(d.id);
                    if (countyInfo) {
                        const tooltip = document.querySelector('.tooltip');
                        tooltip.style.display = 'block';
                        tooltip.style.left = (event.pageX + 10) + 'px';
                        tooltip.style.top = (event.pageY - 10) + 'px';
                        tooltip.innerHTML = `
                            <strong>${countyInfo.name}</strong><br/>
                            Density: ${countyInfo.density.toFixed(1)}/sq mi<br/>
                            Population: ${countyInfo.population.toLocaleString()}<br/>
                            Area: ${countyInfo.area.toFixed(1)} sq mi
                        `;
                    }
                })
                .on('mouseout', () => {
                    document.querySelector('.tooltip').style.display = 'none';
                });
            
            // Draw states
            this.stateGroup.selectAll('path')
                .data(this.states.features)
                .enter()
                .append('path')
                .attr('d', this.path)
                .attr('class', 'state')
                .attr('fill', '#ddd')
                .attr('stroke', '#fff')
                .on('click', this.clicked);
            
            // Add click handler to svg for reset
            this.svg.on('click', (event) => {
                 this.reset();
            });
            
            // Add CSS for styling
            const style = document.createElement('style');
            style.textContent = `
                .state {
                    cursor: pointer;
                }
                .state:hover {
                    fill: #bbb;
                }
                .state.active {
                    fill: none;
                }
                .county {
                    transition: fill 0.3s;
                }
                .county:hover {
                    stroke-width: 1.5px;
                    stroke: #000;
                }
                .tooltip {
                    position: absolute;
                    padding: 8px;
                    background: white;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    pointer-events: none;
                    font-size: 14px;
                    display: none;
                    z-index: 1000;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }
            `;
            document.head.appendChild(style);
            
            if (!document.querySelector('.tooltip')) {
                const tooltip = document.createElement('div');
                tooltip.className = 'tooltip';
                document.body.appendChild(tooltip);
            }
            
        } catch (error) {
            console.error('Error loading map:', error);
        }
    }

    clicked(event, d) {
        event.stopPropagation();
        
        if (this.active.node() === event.currentTarget) {
            return this.reset();
        }
        
        this.active.classed('active', false);
        this.active = d3.select(event.currentTarget).classed('active', true);

        const bounds = this.path.bounds(d);
        const dx = bounds[1][0] - bounds[0][0];
        const dy = bounds[1][1] - bounds[0][1];
        const x = (bounds[0][0] + bounds[1][0]) / 2;
        const y = (bounds[0][1] + bounds[1][1]) / 2;
        const scale = Math.min(8, 0.9 / Math.max(dx / 1000, dy / 600));
        const translate = [500 - scale * x, 300 - scale * y];

        // Show counties for selected state
        const stateId = d.id;
        this.countyGroup.selectAll('path')
            .style('display', function(d) {
                return d.id.startsWith(stateId) ? 'block' : 'none';
            });

        this.g.transition()
            .duration(750)
            .style('stroke-width', 1.5 / scale + 'px')
            .attr('transform', `translate(${translate})scale(${scale})`);

        this.countyGroup.transition()
            .duration(750)
            .style('opacity', 1);

        this.updateSidebar(d);
    }

    reset() {
        this.active.classed('active', false);
        this.active = d3.select(null);

        this.g.transition()
            .duration(750)
            .style('stroke-width', '1px')
            .attr('transform', '');

        this.countyGroup.transition()
            .duration(750)
            .style('opacity', 0)
            .on('end', () => {
                this.countyGroup.selectAll('path')
                    .style('display', 'none');
            });

        document.getElementById(this.sidebarId).classList.remove('active');
    }

    updateSidebar(d) {
        const sidebar = document.getElementById(this.sidebarId);
        const stateInfo = stateProperties[d.id];
        
        if (stateInfo) {
            document.querySelector('.state-name').textContent = stateInfo.name;
            document.querySelector('.population').textContent = stateInfo.population.toLocaleString();
            document.querySelector('.density').textContent = stateInfo.density;
            document.querySelector('.capital').textContent = stateInfo.capital;
            document.querySelector('.largest-city').textContent = stateInfo.largestCity;
            sidebar.classList.add('active');
        }
    }

    getSVGElement() {
        return this.svg.node();
    }

    getGroupElement() {
        return this.g.node();
    }


    toggleDarkMode() {
        this.isDarkMode = !this.isDarkMode;
        if (this.isDarkMode) {
            document.body.classList.add('dark-mode');
            this.stateGroup.selectAll('path')
                .attr('fill', '#333');
        } else {
            document.body.classList.remove('dark-mode');
            this.stateGroup.selectAll('path')
                .attr('fill', '#ddd');
        }
    }
}
